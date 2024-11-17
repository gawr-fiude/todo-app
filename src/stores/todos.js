import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", () => {
  const todos = ref([
    {
      label: "Test Task 1",
      description: "something somehintg oui oui",
      dateCreated: new Date(),
      dateScheduled: new Date(),
    },
  ]);

  function addTodo(todo) {
    this.todos.push(todo);
  }
  return { todos, addTodo };
});
