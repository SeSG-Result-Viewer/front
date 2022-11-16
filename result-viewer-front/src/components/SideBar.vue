<template>
  <v-navigation-drawer
    color="indigo"
    permanent
    :mini-variant.sync="mini"
    app
    dark
  >
    <v-list nav>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="white">mdi-menu</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="title">Menu</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <!-- <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon color="white">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="title">Home</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/signin">
        <v-list-item-icon>
          <v-icon color="white">mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="title">Sign In</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/signup">
        <v-list-item-icon>
          <v-icon color="white">mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="title">Sign Up</v-list-item-title>
      </v-list-item> -->

      <v-list-group color="white">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="white">mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="title">History</v-list-item-title>
        </template>
        <v-list-item>
          <v-list-item-icon class="mb-8">
            <v-icon color="white">mdi-alert</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <p class="mb-0">(US-14)</p>
            <p>In implementation...</p>
          </v-list-item-title>
        </v-list-item>
        <!-- <v-list-item
          v-for="item in items"
          :key="item.text"
          @click="showDataTable(item.text)"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-file</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item> -->
      </v-list-group>
    </v-list>

    <template v-slot:append>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="white">mdi-account-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="title">{{ userName }}</v-list-item-title>
      </v-list-item>

      <v-list-item @click="logout()">
        <v-list-item-icon>
          <v-icon color="white">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="title">Logout</v-list-item-title>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
import router from "@/router/index.js";
import { signOut } from "../service/Authenticate.js";

export default {
  name: "SideBar",

  // props: ["items"],

  data() {
    return {
      mini: true,
      userName: "",
    };
  },

  mounted() {
    this.userName = localStorage.getItem("user_name");
  },

  methods: {
    logout() {
      signOut();
      router.push("/signin");
    },
    // showDataTable(item) {
    //   console.log(item);
    //   // REQUISITAR DO BACK O ARQUIVO DE ACORDO COM O NOME DO ARQUIVO CLICADO
    //   // servicesBack.requestFile(item.name)
    //   //.then(
    //   // SETAR O ARQUIVO CSV COMO O NOVO ARQUIVO
    //   // this.$store.commit("update_csv_name", f.name);
    //   // this.$store.commit("update_csv", file);)
    //   // CHAMAR O MÉTODO DE PROCESSDATA DE NOVO ???
    //   // EventBus.$emit("processData");
    // },
  },
};
</script>