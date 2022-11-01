<template>
  <v-container>
    <v-card class="ma-auto mt-5" width="500" shaped outlined raised>
      <v-card-title>
        <h2 class="ma-auto">Make your registration</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row justify="center">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              placeholder="Guilherme Oliveira da Silva"
              required
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              placeholder="nome@email.com"
              required
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="password"
              :type="show1 ? 'text' : 'password'"
              :rules="passwordRules"
              label="Password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              required
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="confirmPassword"
              :type="show2 ? 'text' : 'password'"
              :rules="passwordRules"
              label="Confirm Password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              required
            ></v-text-field>
          </v-row>

          <v-row justify="center">
            <v-alert type="error" v-model="alertError" dismissible>
              Passwords don't match!
            </v-alert>
          </v-row>

          <v-row justify="center" class="ma-auto mt-5">
            <v-btn color="indigo" dark class="mr-2" @click="validation">
              SIGN IN
            </v-btn>

            <v-btn color="error" @click="reset"> Reset Form </v-btn>
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
// import router from "@/router";
import ServicesBack from "../service/FunctionsBack.js";
import ServicesFront from "../service/FunctionsFront.js";

export default {
  name: "SignUp",

  data: () => ({
    alertError: false,
    show1: false,
    show2: false,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    confirmPassword: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password must be less than 8 characters",
    ],
  }),

  servicesBack: null,
  servicesFront: null,
  created() {
    this.servicesBack = new ServicesBack();
    this.servicesFront = new ServicesFront();
  },

  methods: {
    validation() {
      var validation = this.$refs.form.validate();
      if (this.password !== this.confirmPassword) {
        this.alertError = true;
      } else if (validation) {
        this.alertError = false;
        this.signUp();
      }
    },

    signUp() {
      this.servicesBack.sendSignUpData(this.name, this.email, this.password);
      // router.push("/signin");
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
