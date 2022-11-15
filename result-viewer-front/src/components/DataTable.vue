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
        show-expand
        :loading="loading"
        :page.sync="page"
        @page-count="pageCount = $event"
      >
        <!-- <template v-slot:[`header.graph_id`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="dessertName ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>

            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="dessertName"
                class="pa-4"
                type="text"
                label="Enter the search term"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="dessertName = ''"
                small
                text
                color="primary"
                class="ml-2 mb-2"
                >Clean</v-btn
              >
            </div>
          </v-menu>
        </template> -->

        <!-- EXPANDED ROW -->
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item.graph_id }}</td>
        </template>
        <!-- EXPANDED ROW -->
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
// import { getMetrics, saveData } from "../service/FunctionsBack.js";
import { getMetrics } from "../service/FunctionsBack.js";
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

  servicesFront: null,
  created() {
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
      getMetrics(this.json, this.$store.state.gs_size)
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
      // this.servicesBack.saveData(
      //   "2",
      //   this.$store.state.upload_name,
      //   this.$store.state.archive_csv_name,
      //   this.$store.state.archive_csv_metrics,
      //   this.$store.state.archive_txt_name,
      //   this.$store.state.archive_txt
      // );
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