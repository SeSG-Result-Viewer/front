<template>
  <v-container>
    <v-row justify="center" class="mb-2">
      <h1>Upload your files</h1>
    </v-row>

    <v-col id="widthUploadFiles">
      <v-file-input
        label="Click here to select a .csv file"
        accept=".csv"
        outlined
        chips
        show-size
        rounded
        prepend-icon=""
        @change="file_csv"
      />

      <v-file-input
        label="Click here to select a .txt file"
        accept=".txt"
        outlined
        chips
        show-size
        rounded
        prepend-icon=""
        @change="file_txt"
      />
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "UploadFile",

  data() {
    return {};
  },

  methods: {
    file_csv(f) {
      if (f) {
        f.text().then((file) => {
          this.$store.commit("update_csv", file);
        });
      }
    },

    file_txt(f) {
      if (f) {
        f.text().then((file) => {
          this.$store.commit("update_txt", file);
        });
      }
    },
  },
};
</script>

<style scoped>
#widthUploadFiles {
  margin: auto;
  width: 310px;
}
</style>
