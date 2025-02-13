<template>
  <v-form v-model="validNewTask">
    <v-row>
      <v-col cols="10" md="11">
        <v-text-field
          placeholder="Add new task..."
          density="compact"
          v-model="newTask.title"
          :rules="[required, maxLength(10)]"
        ></v-text-field>
      </v-col>

      <v-col cols="2" md="1">
        <v-btn
          icon="mdi-plus"
          color="blue"
          size="small"
          @click="createNewTask"
        ></v-btn>
      </v-col>
    </v-row>
  </v-form>
  <v-row>
    <v-col>
      <v-btn
        @click="filter = 'completed'"
        :color="filter == 'completed' ? 'green' : 'gray'"
        class="mr-2"
        >Completed ({{ filteredTasks("completed")?.length }})</v-btn
      >
      <v-btn
        @click="filter = 'pending'"
        :color="filter == 'pending' ? 'orange' : 'gray'"
        class="mr-2"
        >Pending ({{ filteredTasks("pending")?.length }})</v-btn
      >
      <v-btn @click="filter = 'all'" :color="filter == 'all' ? 'blue' : 'gray'"
        >All ({{ tasks?.length }})</v-btn
      >
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-slide-y-transition class="py-0" tag="v-list" group>
        <v-list-item
          v-for="task in filteredTasks(filter)"
          :key="task.id"
          :title="task.title"
        >
          <template v-slot:prepend>
            <v-icon
              :icon="task.completed ? 'mdi-check' : 'mdi-circle-outline'"
              :color="task.completed ? 'green' : 'orange'"
            ></v-icon>
          </template>
          <template v-slot:append>
            <v-dialog max-width="500">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  size="x-small"
                  color="green-darken-4"
                  class="mr-2"
                  @click="
                    () => {
                      if (task.id !== undefined) {
                        tasksStore.getTaskById(task.id);
                      }
                    }
                  "
                  >Edit</v-btn
                >
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Edit task">
                  <v-form v-model="taskFormValid">
                    <v-card-text>
                      <v-text-field
                        v-model="tasksStore.selectedTask.title"
                        label="Task"
                        :rules="[required, maxLength(50)]"
                        clearable
                      ></v-text-field>
                      <v-checkbox
                        v-model="tasksStore.selectedTask.completed"
                        label="Completed"
                      ></v-checkbox>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        text="Update task"
                        @click="
                          () => {
                            if (taskFormValid) {
                              isActive.value = false;
                              tasksStore.updateTask(tasksStore.selectedTask);
                              tasksStore.selectedTask = {
                                id: 0,
                                title: '',
                                completed: false,
                              };
                            }
                          }
                        "
                      ></v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </template>
            </v-dialog>
            <v-btn
              color="orange-darken-4"
              size="x-small"
              @click="tasksStore.deleteTask(task)"
              >Delete</v-btn
            >
          </template>
        </v-list-item>
      </v-slide-y-transition>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/store/tasks";
import { Task } from "@/types";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import { required, maxLength } from "@/helpers";
const tasksStore = useTasksStore();
tasksStore.getTasks();
const { tasks, filteredTasks } = storeToRefs(tasksStore);

const newTask = ref<Task>({
  title: "",
  completed: false,
});

const taskFormValid = ref(false);

let filter = ref("completed");

const validNewTask = ref(false);
const createNewTask = () => {
  if (validNewTask.value) {
    tasksStore.createTask(newTask.value);
  }
};
</script>
