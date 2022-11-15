<template>
  <v-app>
    <v-app-bar app width="auto" min-height="auto">
      <v-row justify="center" class="ma-auto">
        <h2>Result Viewer Project</h2>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <!-- <v-footer elevation="20" class="ma-auto" min-height="auto" rounded="pill">
      <v-row justify="center" class="ma-auto">
        <h3 class="ma-2">
          Participantes: Fernanda Barrigosse, Fernanda Mascarenhas, Guilherme
          Prado, Isadora Picoli, Maria Luísa (PO), Nathalia Melo e Renan Benites
        </h3>
      </v-row>
    </v-footer> -->
  </v-app>
</template>

