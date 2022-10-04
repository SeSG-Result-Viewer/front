<template>
  <v-form ref="form" lazy-validation class="width">
    <v-row justify="center">
      <h1 class="mb-3">Upload your files</h1>

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

      <v-alert type="info" v-model="alert_info" dismissible>
        Files must contain -result and -string in the names.
      </v-alert>
      <v-alert type="error" v-model="alert_error" dismissible>
        Sum of file size must be less than 800Kb
      </v-alert>

      <v-btn color="indigo" dark @click="process_files"
        >PROCESS FILES
        <v-icon dark right>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import EventBus from "../utils/bus";

export default {
  name: "UploadFile",

  data() {
    return {
      alert_info: false,
      alert_error: false,
      file_txt: null,
      file_csv: null,
      csv_size: "",
      txt_size: "",
      rules: [
        (f) => !!f || "File is required",
        (f) => (f && f.size > 0) || "File is required",
      ],
    };
  },

  watch: {
    file_csv(f) {
      if (f) {
        f.text().then((file) => {
          this.csv_size = f.size;
          if (f.name.includes("-result.csv")) {
            this.$store.commit("update_csv_name", f.name);
            this.$store.commit("update_csv", file);
          } else {
            this.file_csv = null;
            this.alert_info = true;
          }
        });
      }
    },

    file_txt(f) {
      if (f) {
        f.text().then((file) => {
          this.txt_size = f.size;

          if (f.name.includes("-strings.txt")) {
            this.$store.commit("update_txt_name", f.name);
            this.$store.commit("update_txt", file);
          } else {
            this.file_txt = null;
            this.alert_info = true;
          }
        });
      }
    },
  },

  methods: {
    process_files() {
      var validation = this.$refs.form.validate();
      if (this.file_txt && this.file_csv) {
        const size = this.file_csv.size + this.file_txt.size;

        if (size > 800000) {
          this.alert_error = true;
        } else if (validation) {
          this.alert_info = false;
          this.alert_error = false;
          EventBus.$emit("process_csv");
        }
      }
    },
  },
};
</script>

<style>
.v-file-input {
  width: 280px;
  max-width: 280px;
}
.width {
  width: 280px;
  max-width: 280px;
}
</style>
