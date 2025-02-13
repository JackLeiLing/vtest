import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTasksStore } from "./tasks";
import { Task } from "../types";

describe("Tasks Store", () => {
  let store: ReturnType<typeof useTasksStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useTasksStore();
  });

  it("initializes with empty tasks and errors", () => {
    expect(store.tasks).toEqual([]);
    expect(store.errors).toEqual({});
    expect(store.selectedTask).toEqual({});
  });

  it("fetches tasks successfully", async () => {
    const mockTasks: Task[] = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTasks),
      })
    ) as any;

    await store.getTasks();
    expect(store.tasks).toEqual(mockTasks);
  });

  it("handles fetch tasks error", async () => {
    const mockError = { message: "Failed to fetch" };
    global.fetch = vi.fn(() => Promise.reject(mockError)) as any;

    await store.getTasks();
    expect(store.errors).toEqual(mockError);
  });

  it("deletes a task", () => {
    store.tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];

    store.deleteTask({ id: 1, title: "Task 1", completed: false });
    expect(store.tasks).toEqual([{ id: 2, title: "Task 2", completed: true }]);
  });

  it("fetches a task by id", async () => {
    const mockTask: Task = { id: 1, title: "Task 1", completed: false };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTask),
      })
    ) as any;

    await store.getTaskById(1);
    expect(store.selectedTask).toEqual(mockTask);
  });

  it("updates a task", async () => {
    store.tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];
    const updatedTask: Task = { id: 1, title: "Updated Task", completed: true };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(updatedTask),
      })
    ) as any;

    await store.updateTask(updatedTask);
    expect(store.tasks[0]).toEqual(updatedTask);
  });
});
