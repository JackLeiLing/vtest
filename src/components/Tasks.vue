<template>
  <v-row>
    <v-col cols="10" md="11">
      <v-text-field
        placeholder="Add new task..."
        density="compact"
      ></v-text-field>
    </v-col>

    <v-col cols="2" md="1">
      <v-btn icon="mdi-plus" color="blue" size="small"></v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-list>
        <v-list-item v-for="task in tasks" :key="task.id" :title="task.title">
          <template v-slot:prepend>
            <v-icon
              :icon="task.completed ? 'mdi-check' : 'mdi-circle-outline'"
              :color="task.completed ? 'green' : 'orange'"
            ></v-icon>
          </template>
          <template v-slot:append>
            <v-btn
              icon="mdi-pencil-outline"
              color="green-darken-4"
              size="small"
              class="mr-2"
            />
            <v-btn
              icon="mdi-delete-outline"
              color="purple-darken-4"
              size="small"
            />
          </template>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/store/tasks";
import { storeToRefs } from "pinia";
const tasksStore = useTasksStore();
tasksStore.getTasks();
const { tasks } = storeToRefs(tasksStore);
console.log(tasks.value);
</script>
