<template>
  <v-container>
    <UploadFile />
    <v-row justify="center">
      <v-btn class="ma-2" color="indigo" dark @click="process_files">
        PROCESS FILES
        <v-icon dark right>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import UploadFile from "@/components/UploadFile.vue";
import EventBus from "../utils/bus";
import router from "@/router";

export default {
  name: "HomeView",

  components: {
    UploadFile,
  },

  data() {
    return {};
  },

  methods: {
    process_files() {
      EventBus.$emit("process_csv");
      router.push("datatable");
    },
  },
};
</script>
