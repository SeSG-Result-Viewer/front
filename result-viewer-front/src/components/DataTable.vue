<template>
  <v-card min-width="650px" width="800px" class="mt-3">
    <v-row class="ml-3">
      <h1>{{ filename }}</h1>
    </v-row>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        clearable
        label="Search..."
        single-line
        hide-details
        @input="loading = true"
      />
    </v-card-title>

    <v-data-table
      :search="search"
      :headers="headers"
      :items="items"
      hide-default-footer
      :items-per-page="480"
      fixed-header
      height="420px"
      dense
      multi-sort
      hover
    />
  </v-card>
</template>

<script>
import EventBus from "../utils/bus";
const Papa = require("papaparse");

export default {
  name: "DataTable",

  data() {
    return {
      filename: "",
      search: "",
      headers: [],
      items: [],
      errors: [],
    };
  },
  methods: {
    process_csv() {
      try {
        this.items = this.headers = this.errors = [];
        const archive_csv = this.$store.state.archive_csv;
        this.filename = this.$store.state.archive_csv_name;
        Papa.parse(archive_csv, {
          header: true,
          delimiter: ",",
          skipEmptyLines: true,
          complete: (json) => {
            if (json.errors.length == 0) {
              this.items = json.data;
              // console.log(this.items);
              this.process_headers(json.meta.fields);
            } else {
              console.log(json.errors);
              this.errors = json.errors;
              EventBus.$emit("processed_csv");
            }
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
        // console.log(this.headers);
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
