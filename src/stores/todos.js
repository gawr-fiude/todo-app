import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", () => {
  const todos = ref([]);

  function addTodo(todo) {
    this.todos.push(todo);
  }

  function updateTodo(id, todo) {
    const index = this.todos.findIndex((element) => element.id === id);
    this.todos[index] = {
      ...this.todos.findIndex((element) => element.id === id),
      ...todo,
    };

    console.log(this.todos);
  }

  return { todos, addTodo, updateTodo };
});
