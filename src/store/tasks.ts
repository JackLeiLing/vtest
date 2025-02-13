// Utilities
import { defineStore } from "pinia";

const taskURL = "https://jsonplaceholder.typicode.com/todos";

export const useTasksStore = defineStore("tasksStore", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async getTasks() {
      try {
        this.tasks = await (await fetch(taskURL)).json();
      } catch (error) {}
    },
  },
});
