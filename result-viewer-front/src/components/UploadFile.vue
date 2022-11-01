<template>
  <v-form ref="form" lazy-validation>
    <v-col>
      <v-row justify="center" class="mb-2">
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

      <v-row justify="center">
        <v-text-field
          class="fieldName"
          type="text"
          label="Set a name for the upload"
          placeholder="Azeem"
          outlined
          :rules="rulesUploadName"
          v-model="uploadName"
        />
      </v-row>

      <v-alert type="info" v-model="alertInfo" dismissible class="mt-2">
        Files must contain -result (.csv) and -string (.txt) in the names.
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
      fileCSV: null,
      csvSize: "",
      fileTXT: null,
      txtSize: "",
      gsSize: "",
      uploadName: null,
      alertInfo: false,
      alertError: false,
      rules: [
        (f) => !!f || "File is required",
        (f) => (f && f.size > 0) || "File is required",
      ],
      rulesGS: [(f) => !!f || "GS Size is required"],
      rulesUploadName: [(f) => !!f || "Upload name is required"],
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

    gsSize(s) {
      if (s) {
        this.$store.commit("update_gs_size", s);
      }
    },

    uploadName(n) {
      if (n) {
        this.$store.commit("update_upload_name", n);
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
          EventBus.$emit("processData");
        }
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
