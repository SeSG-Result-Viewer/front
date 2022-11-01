<template>
  <v-container>
    <v-card class="ma-auto mt-5" width="500" shaped outlined raised>
      <v-card-title>
        <h2 class="ma-auto">Make your login</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row justify="center">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-btn color="indigo" dark @click="login"> SIGN IN </v-btn>
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
import ServicesBack from "../service/FunctionsBack.js";
import ServicesFront from "../service/FunctionsFront.js";

export default {
  name: "SignIn",

  servicesBack: null,
  servicesFront: null,
  created() {
    this.servicesBack = new ServicesBack();
    this.servicesFront = new ServicesFront();
  },

  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    showPassword: false,
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) ||
        "The password must be at least 8 characters long",
    ],
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.servicesBack.sendLoginData(this.email, this.password);
        // router.push("/signin");
      }
    },
  },
};
</script>
