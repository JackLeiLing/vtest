// Utilities
import { defineStore } from "pinia";
import { Task } from "./../types";

const taskURL = "https://jsonplaceholder.typicode.com/todos";

export const useTasksStore = defineStore("tasksStore", {
  state: () => ({
    tasks: <Task[]>[],
    errors: {},
  }),
  actions: {
    async getTasks() {
      try {
        this.tasks = await (await fetch(taskURL)).json();
      } catch (error) {}
    },
    async createTask(task: Task) {
      // the JSON placeholder API is not persisting the change, therefore push the id to demo the new task is saved in client store. it shouldn't be pushed if the API can generate ID and save in DB.
      this.tasks.unshift({ ...task, id: Date.now() });
      try {
        await fetch(taskURL, {
          method: "POST",
          body: JSON.stringify({
            title: task.title,
            completed: false,
          }),
        });
      } catch (error) {
        this.errors = error as Record<string, unknown>;
      }
    },
    async deleteTask(task: Task) {
      // the JSON placeholder API is not persisting the change, therefore push the id to demo the new task is saved in client store. it shouldn't be pushed if the API can generate ID and save in DB.
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      try {
        await fetch(taskURL + "/" + task.id, {
          method: "DELETE",
          body: JSON.stringify({
            id: task.id,
          }),
        });
      } catch (error) {
        this.errors = error as Record<string, unknown>;
      }
    },
  },
});
