<template>
  <v-form ref="form" lazy-validation>
    <v-col>
      <v-row justify="center">
        <h1>Upload your files</h1>
      </v-row>

      <v-row justify="center">
        <v-file-input
          label="Click here to select a .csv file"
          accept=".csv"
          outlined
          chips
          show-size
          prepend-icon=""
          v-model="fileCSV"
          :rules="rules"
        />
      </v-row>

      <v-row justify="center">
        <v-file-input
          label="Click here to select a .txt file"
          accept=".txt"
          outlined
          chips
          show-size
          prepend-icon=""
          v-model="fileTXT"
          :rules="rules"
        />
      </v-row>

      <v-row justify="center">
        <v-text-field
          type="number"
          label="What is the GS-SIZE of this review?"
          outlined
          :rules="rulesGS"
          v-model="gsSize"
        >
        </v-text-field>
      </v-row>

      <v-alert type="info" v-model="alertInfo" dismissible>
        Files must contain -result and -string in the names.
      </v-alert>
      <v-alert type="error" v-model="alertError" dismissible>
        Sum of file size must be less than 800Kb
      </v-alert>

      <v-row justify="center" class="ma-auto mt-2">
        <v-btn class="" color="indigo" dark @click="processFiles"
          >PROCESS FILES
          <v-icon dark right>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-form>
</template>

<script>
import EventBus from "../utils/bus";
import ServicesBack from "../service/FunctionsBack.js";

export default {
  name: "UploadFile",

  data() {
    return {
      alertInfo: false,
      alertError: false,
      fileTXT: null,
      fileCSV: null,
      csvSize: "",
      txtSize: "",
      gsSize: "",
      rules: [
        (f) => !!f || "File is required",
        (f) => (f && f.size > 0) || "File is required",
      ],
      rulesGS: [(f) => !!f || "GS Size is required"],
    };
  },

  watch: {
    fileCSV(f) {
      if (f) {
        f.text().then((file) => {
          this.csvSize = f.size;
          if (f.name.includes("-result.csv")) {
            this.$store.commit("update_csv_name", f.name);
            this.$store.commit("update_csv", file);
          } else {
            this.fileCSV = null;
            this.alertInfo = true;
          }
        });
      }
    },

    fileTXT(f) {
      if (f) {
        f.text().then((file) => {
          this.txtSize = f.size;

          if (f.name.includes("-strings.txt")) {
            this.$store.commit("update_txt_name", f.name);
            this.$store.commit("update_txt", file);
          } else {
            this.fileTXT = null;
            this.alertInfo = true;
          }
        });
      }
    },
  },

  servicesBack: null,
  created() {
    this.servicesBack = new ServicesBack();
  },

  methods: {
    processFiles() {
      var validation = this.$refs.form.validate();
      if (this.fileTXT && this.fileCSV) {
        const size = this.fileCSV.size + this.fileTXT.size;

        if (size > 800000) {
          this.alertError = true;
        } else if (validation) {
          this.alertInfo = false;
          this.alertError = false;
          this.saveGSSize(this.gsSize);
          this.servicesBack.sendTXT(
            this.$store.state.archive_txt_name,
            this.$store.state.archive_txt
          );
          EventBus.$emit("processData");
        }
      }
    },

    saveGSSize(n) {
      if (n) {
        this.$store.commit("update_gs_size", n);
      }
    },
  },
};
</script>

<style>
.v-file-input {
  min-width: 250px;
  max-width: 350px;
}
.v-text-field {
  min-width: 250px;
  max-width: 350px;
}
</style>
