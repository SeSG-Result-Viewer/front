<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          clearable
          label="Search..."
          single-line
          hide-details
          @input="loading = true"
        />
      </v-card-title>
      <v-data-table :search="search" :headers="headers" :items="items" />
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "DataTable",
  props: ["headers", "items"],

  data() {
    return {
      search: "",
    };
  },
};
</script>
