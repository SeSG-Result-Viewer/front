<template>
  <v-container>
    <v-card v-if="tableCard">
      <v-card-title>
        <v-col>
          <v-row>
            <v-row class="ma-auto" justify="start">
              <h2>{{ fileName }}</h2>
            </v-row>

            <v-row class="ma-auto" justify="center">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                clearable
                label="Search..."
              />
            </v-row>

            <v-row class="ma-auto" justify="end">
              <v-btn text color="indigo" @click="returnMetrics"
                >Calculate Metrics</v-btn
              >
              <v-btn
                v-if="calcMetrics"
                text
                color="indigo"
                @click="exportMetricsFile"
                >Export</v-btn
              >
            </v-row>
          </v-row>
        </v-col>
      </v-card-title>

      <v-data-table
        :show-select="calcMetrics"
        :search="search"
        :headers="headers"
        :items="items"
        v-model="selected"
        item-key="graph_id"
        fixed-header
        :items-per-page="15"
        checkbox-color="indigo"
        dense
        hover
        hide-default-footer
        multi-sort
        :loading="loading"
        :page.sync="page"
        @page-count="pageCount = $event"
      >
      </v-data-table>

      <v-divider> </v-divider>

      <v-row justify="center" class="my-5">
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="7"
        ></v-pagination>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import EventBus from "../utils/bus";
import ServicesBack from "../service/FunctionsBack.js";
import ServicesFront from "../service/FunctionsFront.js";

export default {
  name: "DataTable",

  data() {
    return {
      filters: { graph_id: [], min_df: [] },
      page: 1,
      pageCount: 0,
      loading: false,
      tableCard: false,
      fileName: "",
      json: null,
      search: "",
      headers: [],
      items: [],
      selected: [],
      calcMetrics: false,
    };
  },

  servicesBack: null,
  servicesFront: null,
  created() {
    this.servicesBack = new ServicesBack();
    this.servicesFront = new ServicesFront();
  },

  methods: {
    processData() {
      this.loading = true;
      this.calcMetrics = false;
      try {
        const json = this.servicesFront.processCSV(
          this.$store.state.archive_csv
        );
        this.json = json;
        this.tableCard = true;
        this.fileName = this.$store.state.archive_csv_name;
        this.headers = this.servicesFront.getHeaders(json.meta.fields);
        this.items = json.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },

    returnMetrics() {
      this.loading = true;
      this.servicesBack
        .getMetrics(this.json, this.$store.state.gs_size)
        .then((data) => {
          const csv_metrics = this.servicesFront.getDataCSV(data);
          this.$store.commit("update_csv_metrics", csv_metrics);
          this.showMetrics();
          this.calcMetrics = true;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },

    showMetrics() {
      this.items = this.headers = [];
      const json = this.servicesFront.processCSV(
        this.$store.state.archive_csv_metrics
      );
      this.headers = this.servicesFront.getHeaders(json.meta.fields);
      this.items = json.data;
      this.servicesBack.saveData(
        "2",
        this.$store.state.upload_name,
        this.$store.state.archive_csv_name,
        this.$store.state.archive_csv_metrics,
        this.$store.state.archive_txt_name,
        this.$store.state.archive_txt
      );
    },

    exportMetricsFile() {
      if (this.selected.length === 0) {
        this.servicesFront.exportCSV(
          this.$store.state.archive_csv_metrics,
          this.$store.state.archive_csv_name
        );
      } else {
        const stringifySelected = JSON.stringify(this.selected);
        const csvSelected = this.servicesFront.getDataCSV(stringifySelected);
        this.servicesFront.exportCSV(
          csvSelected,
          this.$store.state.archive_csv_name
        );
      }
    },
  },

  mounted() {
    EventBus.$on("processData", this.processData);
  },
};
</script>
