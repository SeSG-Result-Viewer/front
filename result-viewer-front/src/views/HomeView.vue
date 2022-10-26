<template>
  <v-container>
    <SideBar :items="items"></SideBar>
    <v-col>
      <v-row class="ma-auto">
        <v-col>
          <UploadFile />
        </v-col>

        <v-col class="mt-2">
          <v-card min-width="300">
            <v-card-title>Informative</v-card-title>
            <v-card-text>
              <h3>1st - Insert your files returned from Sesg.</h3>
              <br />
              <h3>2nd - GS-Size is the number of articles in the review.</h3>
              <br />
              <h3>
                3nd - Calculate Metrics returns additional columns informing the
                score of each string (table row).
              </h3>
              <br />
              <h3>
                4rd - You can export the table after performing the metrics
                calculation.
              </h3>
              <br />
              <h3>
                5rd - You have access to your upload history in the sidebar on
                the side.
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <DataTable />
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";
import DataTable from "@/components/DataTable.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "HomeView",

  components: {
    UploadFile,
    DataTable,
    SideBar,
  },

  data() {
    return {
      // RETORNAR OS ITEMS DO BANCO
      items: [
        {
          text: "teste1-results",
        },
        {
          text: "teste2-results",
        },
        {
          text: "teste3-results",
        },
        {
          text: "teste4-results",
        },
      ],
    };
  },
};
</script>

<style></style>
