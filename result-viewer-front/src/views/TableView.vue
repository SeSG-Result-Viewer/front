<template>
  <v-container>
    <v-row id="align">
      <h1 class="ml-6 mt-2">File name.csv</h1>
      <v-spacer></v-spacer>
      <v-btn text to="/" color="indigo"> Datatable Score </v-btn>
    </v-row>
    <DataTable :headers="headers" :items="items" />
  </v-container>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import EventBus from "../utils/bus";
const Papa = require("papaparse");

export default {
  name: "TableView",

  components: {
    DataTable,
  },

  data() {
    return {
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

        Papa.parse(archive_csv, {
          header: true,
          delimiter: ",",
          skipEmptyLines: true,
          complete: (json) => {
            if (json.errors.length == 0) {
              this.items = json.data;
              this.process_headers(json.meta.fields);
            } else {
              console.log("Errors in process_csv:");
              console.log(json.errors);
              this.errors = json.errors;
              EventBus.$emit("processed-data");
            }
          },
        });
      } catch (error) {
        console.log("This error has been caught. Error message:");
        console.error(error);
        EventBus.$emit("processed-data");
      }
    },

    process_headers(headers) {
      try {
        console.log("Processing Headers...");
        headers.forEach((header) => {
          this.headers.push({
            text: header,
            align: "start",
            filterable: true,
            value: header,
          });
        });

        EventBus.$emit("processed-data");
        console.log("All done! Displaying data...");
      } catch (error) {
        EventBus.$emit("processed-data");
        console.log(
          "This error has been caught, in processHeaders(). Error message:"
        );
        console.error(error);
      }
    },
  },

  mounted() {
    EventBus.$on("process_csv", this.process_csv);
  },
};
</script>

<style scoped>
#align {
  margin-bottom: 10px;
  align-items: center;
}
</style>
