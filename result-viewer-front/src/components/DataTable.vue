<template>
  <v-container>
    <v-card v-if="tableCard">
      <v-card-title align="start">
        <v-col>
          <v-row>
            <v-row class="ma-auto" justify="start">
              <h2>{{ fileName }}</h2></v-row
            >

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
              <v-btn v-if="calcMetrics" text color="indigo" @click="getFileCSV"
                >Export</v-btn
              >
            </v-row>
          </v-row>
        </v-col>
      </v-card-title>

      <v-data-table
        :search="search"
        :headers="headers"
        :items="items"
        hide-default-footer
        :items-per-page="480"
        fixed-header
        height="500"
        dense
        hover
        multi-sort
        :show-select="showSelect"
        item-key="graph_id"
        v-model="selected"
        checkbox-color="indigo"
      >
      </v-data-table>
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
      tableCard: false,
      fileName: "",
      json: null,
      search: "",
      headers: [],
      items: [],
      selected: [],
      showSelect: false,
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
      this.tableCard = true;
      this.fileName = this.$store.state.archive_csv_name;
      try {
        const json = this.servicesFront.processCSV(
          this.$store.state.archive_csv
        );
        this.json = json;
        this.items = json.data;
        this.headers = this.servicesFront.getHeaders(json.meta.fields);
      } catch (error) {
        console.log(error);
      }
    },

    returnMetrics() {
      this.servicesBack
        .getMetrics(this.json, this.$store.state.gs_size)
        .then((data) => {
          const csv_metrics = this.servicesFront.getDataCSV(data);
          this.$store.commit("update_csv", csv_metrics);
          this.items = this.headers = [];
          this.processData();
          this.showSelect = true;
          this.calcMetrics = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getFileCSV() {
      if (this.selected.length === 0) {
        this.servicesFront.exportCSV(
          this.$store.state.archive_csv,
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
