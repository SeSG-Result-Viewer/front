<template>
  <v-container>
    <v-card
      class="ma-auto mt-5"
      width="500"
      shaped
      outlined
      raised
      :loading="loading"
    >
      <v-card-title>
        <h2 class="ma-auto">Make your registration</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation @submit.prevent="validation()">
          <v-row justify="center">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              placeholder="Nome Sobrenome"
              :disabled="disabled"
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              placeholder="nome@email.com"
              :disabled="disabled"
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="password"
              :type="show ? 'text' : 'password'"
              :rules="passwordRules"
              label="Password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              placeholder="123#4#6F"
              :disabled="disabled"
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="confirmPassword"
              :type="show ? 'text' : 'password'"
              :rules="passwordRules"
              label="Confirm Password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              placeholder="123#4#6F"
              :disabled="disabled"
            ></v-text-field>
          </v-row>

          <v-row justify="center" class="mt-5">
            <v-alert type="error" v-model="alertError" dismissible>
              {{ errorMessage }}
            </v-alert>
          </v-row>

          <v-row justify="center" class="ma-auto mt-3">
            <v-btn color="indigo" dark class="mr-2" type="submit">
              SIGN IN
            </v-btn>

            <v-btn color="error" @click="reset()"> Reset Form </v-btn>
          </v-row>

          <v-row justify="center" class="mt-5">
            <v-btn color="indigo" text dark to="/signin">
              Already have an account? Click here.
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import router from "@/router";
import { isSignedIn } from "../service/Authenticate.js";
import { sendSignUpData } from "../service/FunctionsBack.js";

export default {
  name: "SignUp",

  mounted() {
    isSignedIn().then((token) => {
      if (token) {
        router.push("/");
      }
    });
  },

  data: () => ({
    alertError: false,
    errorMessage: "",
    show: false,
    loading: false,
    disabled: false,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required!",
      (v) => v.split(" ").length === 2 || "First and last name only!",
      (v) => v.charAt(0) !== " " || "First character cannot be a space!",
      (v) =>
        v.charAt(v.length - 1) !== " " || "Last character cannot be a space!",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required!",
      (v) => /...+@..+\...+/.test(v) || "E-mail must be valid!",
      (v) => !/[ ]/.test(v) || "No spaces allowed!",
    ],
    password: "",
    confirmPassword: "",
    passwordRules: [
      (v) => !!v || "Password is required!",
      (v) => (v && v.length >= 8) || "Password must be less than 8 characters!",
      (v) => !/[ ]/.test(v) || "No spaces allowed!",
    ],
  }),

  methods: {
    validation() {
      var validation = this.$refs.form.validate();
      if (this.name.charAt(0) === " ") {
        console.log("teste");
      }
      if (this.password !== this.confirmPassword) {
        this.alertError = true;
        this.errorMessage = "Passwords don't match!";
      } else if (validation) {
        this.alertError = false;
        this.loading = true;
        this.disabled = true;
        this.signUp();
      }
    },

    async signUp() {
      const request = await sendSignUpData(
        this.name,
        this.email,
        this.password
      );

      if (request === "E-mail already registered!") {
        this.alertError = true;
        this.errorMessage = "E-mail already registered!";
        this.loading = false;
        this.disabled = false;
      } else if (request === "The user email format is invalid!") {
        this.alertError = true;
        this.errorMessage = "The user email format is invalid!";
        this.loading = false;
        this.disabled = false;
      } else {
        router.push("/signin");
      }
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
