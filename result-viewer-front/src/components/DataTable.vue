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
              <v-btn text color="indigo">Export</v-btn>
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
        multi-sort
        hover
    /></v-card>
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
      const json = this.servicesFront.processCSV(this.$store.state.archive_csv);
      this.json = json;
      this.items = json.data;
      this.headers = this.servicesFront.getHeaders(json.meta.fields);
    },

    returnMetrics() {
      this.servicesBack
        .getMetrics(this.json, this.$store.state.gs_size)
        .then((data) => {
          const csv_metrics = this.servicesFront.getDataBack(data);
          this.$store.commit("update_csv", csv_metrics);
          this.items = this.headers = [];
          this.processData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    EventBus.$on("processData", this.processData);
  },
};
</script>
