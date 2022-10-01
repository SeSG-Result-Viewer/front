<template>
  <v-card width="850px" height="540px" class="mt-5">
    <v-card-title class="mt-n5">
      <v-col>
        <h2 class="mt-n4">{{ filename }}</h2>
      </v-col>
      <v-col>
        <v-text-field
          class="mt-n8"
          v-model="search"
          append-icon="mdi-magnify"
          clearable
          label="Search..."
          single-line
          hide-details
          @input="loading = true"
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
      height="450px"
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
