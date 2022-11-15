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
        <h2 class="ma-auto">Make your login</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation @submit.prevent="authenticate()">
          <v-row justify="center">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              placeholder="nome@email.com"
              required
              :disabled="disabled"
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
              label="Password"
              placeholder="123#4#6F"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              required
              :disabled="disabled"
            ></v-text-field>
          </v-row>

          <v-row justify="center" class="mt-5">
            <v-alert type="error" v-model="alertError" dismissible>
              {{ errorMessage }}
            </v-alert>
          </v-row>

          <v-row justify="center">
            <v-btn color="indigo" type="submit" dark> SIGN IN </v-btn>
          </v-row>

          <v-row justify="center" class="mt-5">
            <v-btn color="indigo" text dark to="/signup">
              Don't have an account? Click here.
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import router from "@/router/index.js";
import { signIn, isSignedIn } from "../service/Authenticate.js";

export default {
  name: "SignIn",

  mounted() {
    isSignedIn().then((token) => {
      if (token) {
        router.push("/");
      }
    });
  },

  data() {
    return {
      alertError: false,
      errorMessage: "",
      loading: false,
      disabled: false,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /...+@..+\...+/.test(v) || "E-mail must be valid!",
        (v) => !/[ ]/.test(v) || "No spaces allowed!",
      ],
      showPassword: false,
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required!",
        (v) =>
          (v && v.length >= 8) || "Password must be less than 8 characters!",
        (v) => !/[ ]/.test(v) || "No spaces allowed!",
      ],
    };
  },

  methods: {
    async authenticate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.disabled = true;
        const request = await signIn(this.email, this.password);

        if (request.access_token) {
          this.$store.commit("update_user_name", request.name);
          this.loading = false;
          this.disabled = false;
          router.push("/");
        }

        this.alertError = true;
        this.errorMessage = request;
        this.loading = false;
        this.disabled = false;
      }
    },
  },
};
</script>