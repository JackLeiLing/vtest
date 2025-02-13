// Utilities
import { defineStore } from "pinia";
import { Task } from "./../types";
import { isSwitchStatement } from "typescript";

const taskURL = "https://jsonplaceholder.typicode.com/todos";

export const useTasksStore = defineStore("tasksStore", {
  state: () => ({
    tasks: <Task[]>[],
    errors: {},
    selectedTask: <Task>{},
  }),
  actions: {
    async getTasks() {
      try {
        this.tasks = await (await fetch(taskURL)).json();
      } catch (error) {
        this.errors = error as Record<string, unknown>;
      }
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
    async getTaskById(id: number) {
      try {
        this.selectedTask = await (
          await fetch(taskURL + "/" + id.toString())
        ).json();
      } catch (error) {
        this.errors = error as Record<string, unknown>;
      }
    },
    async updateTask(payload: Task) {
      const task = this.tasks.find((t) => t.id == payload.id);
      if (task) {
        task.title = payload.title;
        task.completed = payload.completed;
      }

      try {
        await fetch(taskURL + "/" + payload.id, {
          method: "PATCH",
          body: JSON.stringify(this.selectedTask),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      } catch (error) {
        this.errors = error as Record<string, unknown>;
      }
    },
  },
  getters: {
    filteredTasks(state) {
      return (filter: string) => {
        if (filter == "completed") {
          return state.tasks.filter((t) => t.completed);
        } else if (filter == "pending") {
          return state.tasks.filter((t) => !t.completed);
        } else {
          return state.tasks;
        }
      };
    },
  },
});
