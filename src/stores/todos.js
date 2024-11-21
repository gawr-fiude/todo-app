import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { datetime, RRule } from "rrule";

export const useTodoStore = defineStore("todos", () => {
  const todos = useStorage("todos", []);

  function addTodo(todo) {
    addTodoHelper(todo, 0);
  }

  function addTodoHelper(todo, attempts) {
    // Throw Error if failed to find new UUID 5 times in a row
    if (attempts >= 5) {
      throw new Error(
        "Something went wrong while creating a new ID for this task",
      );
    }

    const id = crypto.randomUUID();
    if (todos.value.findIndex((element) => element.id === id) === -1) {
      const now = new Date();

      const rule = new RRule({
        freq: RRule.DAILY,
        interval: 1,
        dtstart: datetime(now.getFullYear(), now.getMonth() + 1, now.getDate()),
        until: datetime(now.getFullYear(), now.getMonth() + 1, now.getDate()),
      });

      const newTodo = {
        id: id,
        label: todo.label,
        description: todo.description,
        dateCreated: new Date(),
        dateRule: rule.toString(),
      };

      todos.value.push(newTodo);
    } else {
      addTodoHelper(todo, attempts + 1);
    }
  }

  function updateTodo(id, todo) {
    const index = this.todos.findIndex((element) => element.id === id);
    const updatedItem = {
      ...this.todos[index],
      ...todo,
    };
    this.todos[index] = updatedItem;
  }

  function removeAll() {
    this.todos = [];
  }

  return { todos, addTodo, updateTodo, removeAll };
});
