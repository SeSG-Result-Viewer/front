<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="mx-4 mb-2">Upload your files</h1>
        <UploadFile />

        <v-btn class="mx-13" color="indigo" dark @click="process_files">
          PROCESS FILES
          <v-icon dark right>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <DataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";
import DataTable from "@/components/DataTable.vue";
import EventBus from "../utils/bus";

export default {
  name: "HomeView",

  components: {
    UploadFile,
    DataTable,
  },

  data() {
    return {};
  },

  methods: {
    process_files() {
      EventBus.$emit("process_csv");
    },
  },
};
</script>

<style>
.v-file-input {
  width: 280px;
}
</style>
