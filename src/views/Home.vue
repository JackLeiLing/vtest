<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <h1 class="text-h5 text-blue-darken-4 mb-3 font-weight-bold">Tasks</h1>
      <Tasks />
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import Tasks from "@/components/Tasks.vue";
</script>
