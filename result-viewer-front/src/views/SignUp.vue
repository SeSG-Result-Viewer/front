<template>
  <v-container>
    <v-card class="ma-auto mt-5" width="500" shaped outlined raised>
      <v-card-title>
        <h2 class="ma-auto">Make your registration</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            type="password"
            :rules="passwordRules"
            label="Confirm Password"
            required
          ></v-text-field>

          <v-alert type="error" v-model="alert_error" dismissible>
            Passwords don't match!
          </v-alert>

          <v-row justify="start" class="ma-auto mt-5">
            <v-btn
              :disabled="!valid"
              color="indigo"
              dark
              class="mr-2"
              @click="SignUp"
            >
              SIGN IN
            </v-btn>

            <v-btn color="error" @click="reset"> Reset Form </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import router from "@/router";

export default {
  name: "SignUp",

  data: () => ({
    valid: true,
    alert_error: false,
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

  watch: {
    confirmPassword() {},
    password() {},
    name() {},
    email() {},
  },

  methods: {
    SignUp() {
      var validation = this.$refs.form.validate();
      if (this.password !== this.confirmPassword) {
        this.alert_error = true;
      } else if (validation) {
        this.alert_error = false;
        router.push("/signin");
      }
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
