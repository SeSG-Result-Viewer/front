<template>
  <v-container>
    <v-row>
      <v-col>
        <UploadFile />
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

export default {
  name: "HomeView",

  components: {
    UploadFile,
    DataTable,
  },
};
</script>

<style></style>
