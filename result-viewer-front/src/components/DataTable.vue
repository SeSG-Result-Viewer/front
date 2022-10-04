<template>
  <v-container>
    <v-row class="ma-auto" justify="end" v-if="buttons">
      <v-btn text color="indigo">Calculate Metrics</v-btn>
      <v-btn text color="indigo">Export</v-btn>
    </v-row>
    <v-card class="mt-2">
      <v-card-title align="start">
        <v-col>
          <h2>{{ filename }}</h2>
        </v-col>
        <v-col>
          <v-text-field
            class="ma-auto"
            v-model="search"
            append-icon="mdi-magnify"
            clearable
            label="Search..."
          />
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
const Papa = require("papaparse");

export default {
  name: "DataTable",

  data() {
    return {
      buttons: false,
      filename: "",
      search: "",
      headers: [],
      items: [],
    };
  },
  methods: {
    process_csv() {
      try {
        this.items = this.headers = [];
        const archive_csv = this.$store.state.archive_csv;
        const teste = this.$store.state.archive_csv_name;
        this.filename = teste;
        Papa.parse(archive_csv, {
          header: true,
          delimiter: ",",
          skipEmptyLines: true,
          complete: (json) => {
            this.items = json.data;
            this.process_headers(json.meta.fields);
            EventBus.$emit("processed_csv");
          },
        });
      } catch (error) {
        EventBus.$emit("processed_csv");
        console.error(error);
      }
    },

    process_headers(headers) {
      try {
        headers.forEach((header) => {
          this.headers.push({
            text: header,
            value: header,
          });
        });
        EventBus.$emit("processed_csv");
      } catch (error) {
        EventBus.$emit("processed_csv");
        console.error(error);
      }
    },

    process_txt() {
      console.log("Nothing");
    },
  },

  mounted() {
    EventBus.$on("process_csv", this.process_csv);
  },
};
</script>
