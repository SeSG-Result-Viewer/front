<template>
  <div>
    <v-file-input
      label="Click here to select a .csv file"
      accept=".csv"
      outlined
      chips
      show-size
      rounded
      prepend-icon=""
      v-model="file_csv"
      :rules="rules"
    />

    <v-file-input
      label="Click here to select a .txt file"
      accept=".txt"
      outlined
      chips
      show-size
      rounded
      prepend-icon=""
      v-model="file_txt"
      :rules="rules"
    />
  </div>
</template>

<script>
export default {
  name: "UploadFile",

  data() {
    return {
      file_txt: null,
      file_csv: null,
      rules: [
        (value) =>
          !value ||
          value.size <= 800000 ||
          "File size should be less than 800 KB!",
      ],
    };
  },

  watch: {
    file_csv(f) {
      if (f) {
        f.text().then((file) => {
          const csv_name = f.name;
          this.$store.commit("update_csv_name", csv_name);
          this.$store.commit("update_csv", file);
        });
      }
    },

    file_txt(f) {
      if (f) {
        f.text().then((file) => {
          const txt_name = f.name;
          this.$store.commit("update_txt_name", txt_name);
          this.$store.commit("update_txt", file);
        });
      }
    },
  },
};
</script>

<style scoped></style>
