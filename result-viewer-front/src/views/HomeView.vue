<template>
  <v-container>
    <v-col>
      <v-row class="ma-auto mb-5">
        <v-col>
          <UploadFile />
        </v-col>

        <v-col>
          <v-card class="ma-auto ma-xs-16" max-width="500">
            <v-card-title>Informativos</v-card-title>
            <v-card-text>
              <p>1st - Insert your files returned from Sesg.</p>
              <p>
                2nd - Calculate Metrics returns additional columns informing the
                score of each string (table row).
              </p>
              <p>
                3rd - It is possible to export the table containing the metrics
                columns.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="ma-2"></v-divider>
      <v-row> <DataTable /> </v-row
    ></v-col>
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
