<template>
  <v-container>
    <v-col>
      <v-row class="ma-auto">
        <v-col>
          <UploadFile />
        </v-col>

        <v-col>
          <v-card class="ma-auto" min-width="300">
            <v-card-title>Informative</v-card-title>
            <v-card-text>
              <h3>1st - Insert your files returned from Sesg.</h3>
              <h3>
                <br />
                2nd - Calculate Metrics returns additional columns informing the
                score of each string (table row).
              </h3>
              <br />
              <h3>
                3rd - It is possible to export the table containing the metrics
                columns.
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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

<style></style>
