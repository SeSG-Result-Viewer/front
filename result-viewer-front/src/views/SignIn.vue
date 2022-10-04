<template>
  <v-container>
    <v-card class="ma-auto mt-5" width="500" shaped outlined raised>
      <v-card-title>
        <h2 class="ma-auto">Make your login</h2>
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
            v-model="Password"
            type="password"
            :rules="PasswordRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="indigo"
            dark
            class="mt-5"
            @click="login"
          >
            SIGN IN
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SignIn",

  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    Password: "",
    PasswordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) ||
        "The password must be at least 8 characters long",
    ],
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
