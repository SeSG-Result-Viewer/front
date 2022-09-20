<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <h2 class="mr-5">Result Viewer</h2>
      <v-btn text to="/"> Home </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style></style>
