<template>
  <v-container>
    <!-- <SideBar :items="items"></SideBar> PARA O USO DO HISTÓRICO-->
    <SideBar />
    <v-col>
      <v-row class="mx-auto">
        <v-col>
          <UploadFile />
        </v-col>

        <v-col class="mt-2">
          <v-card min-width="300">
            <v-card-title>Informative</v-card-title>
            <v-card-text>
              <h3>
                1 - On upload, insert your files returned from Sesg. "GS-Size"
                is how many articles the review has.
              </h3>
              <br />
              <h3>
                2 - When calculating metrics, new columns are added containing
                the score of each string (table row).
              </h3>
              <br />
              <h3>
                3 - You can export the table (or only the selected rows) after
                calculating the metrics, with the scores included.
              </h3>
              <br />
              <h3>
                4 - (Not implemented!) You have access to your upload history in
                the sidebar onthe side.
              </h3>
              <br />
              <!-- <v-virtual-scroll
                :items="informatives"
                :item-height="50"
                height="250"
              >
                <template v-slot:default="{ item }">
                  <h3>{{ item.text }}</h3>
                </template>
              </v-virtual-scroll> -->
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
import { isSignedIn } from "@/service/Authenticate";
import router from "@/router";

export default {
  name: "HomeView",

  components: {
    UploadFile,
    DataTable,
    SideBar,
  },

  // data() {
  //   return {
  //     RETORNAR OS ITEMS DO BANCO
  //     items: [
  //       { text: "azeem-results" },
  //       { text: "teste-results" },
  //       { text: "Teste 3" },
  //       { text: "Teste 4" },
  //     ],
  //   };
  // },

  mounted() {
    isSignedIn().then((token) => {
      if (!token) {
        router.push("/signin");
      }
    });

    // RETORNAR A LISTA DOS ITEMS DO BANCO E MANDAR PRA SIDEBAR
  },
};
</script>

<style>
.v-card {
  display: flex !important;
  flex-direction: column;
}
</style>
