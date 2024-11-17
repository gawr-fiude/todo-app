<template>
  <button
    @click="
      () => {
        dialogNewTodo.showModal();
      }
    "
    class="focusable"
  >
    Add TODO
  </button>
  <button
    @click="
      () => {
        dialogRemoveAll.showModal();
      }
    "
    class="focusable"
  >
    Remove All
  </button>

  <ul>
    <li v-for="todo in todoStore.todos" :key="todo.createdDate + todo.label">
      {{ todo.label }}
    </li>
  </ul>

  <dialog ref="dialog-new-todo" class="padding--vertical padding--horizontal">
    <form @submit.prevent="addTodo">
      <fieldset>
        <legend>Label</legend>
        <input v-model="newTodo.label" type="text" />
      </fieldset>

      <fieldset>
        <legend>Description</legend>
        <input v-model="newTodo.description" type="text" />
      </fieldset>

      <button type="submit" class="focusable">Add</button>
    </form>
  </dialog>

  <dialog ref="dialog-remove-all">
    <p>Delete all incomplete TODOs?</p>

    <button>Cancel</button>
    <button>Confirm</button>
  </dialog>
</template>

<script setup>
import { ref, useTemplateRef } from "vue";

import { useTodoStore } from "@/stores/todos.js";
const todoStore = useTodoStore();

const newTodo = ref({
  label: "",
  description: "",
});

const dialogNewTodo = useTemplateRef("dialog-new-todo");

function addTodo() {
  todoStore.addTodo({
    label: newTodo.value.label,
    description: newTodo.value.label,
    createdDate: new Date(),
    lastModifiedDate: new Date(),
  });

  newTodo.value = {
    name: "",
    description: "",
  };
}
</script>

<style scoped>
button {
  padding: 0.2rem;

  background: var(--color-text);
  color: var(--color-base);
  margin-right: 1rem;
}
</style>
