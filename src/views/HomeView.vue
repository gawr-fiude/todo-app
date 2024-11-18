<template>
  <div class="button-group">
    <button
      @click="
        () => {
          showAddTodoDialog = true;
        }
      "
      variant="primary"
    >
      Add TODO
    </button>
    <button
      @click="
        () => {
          showRemoveAllDialog = true;
        }
      "
      variant="primary"
    >
      Remove All
    </button>
  </div>

  <ul>
    <li v-for="todo in todoStore.todos" :key="todo.createdDate + todo.label">
      {{ todo.label }}
    </li>
  </ul>

  <DialogPopUp
    :show="showAddTodoDialog"
    @close-modal="
      () => {
        showAddTodoDialog = false;
      }
    "
  >
    <form @submit.prevent="addTodo" class="dialog-content">
      <fieldset class="wrapper">
        <legend class="legend">Label</legend>
        <input v-model="newTodo.label" type="text" />
      </fieldset>

      <fieldset class="wrapper">
        <legend class="legend">Description</legend>
        <input v-model="newTodo.description" type="text" />
      </fieldset>

      <button type="submit" variant="primary">Add</button>
    </form>
  </DialogPopUp>

  <DialogPopUp
    :show="showRemoveAllDialog"
    @close-modal="
      () => {
        showRemoveAllDialog = false;
      }
    "
  >
    <article class="dialog-content">
      <p>Delete all incomplete TODOs?</p>

      <button variant="primary">Confirm</button>
    </article>
  </DialogPopUp>
</template>

<script setup>
import { ref } from "vue";

import DialogPopUp from "@/components/DialogPopUp.vue";

import { useTodoStore } from "@/stores/todos.js";
const todoStore = useTodoStore();

const newTodo = ref({
  label: "",
  description: "",
});

const showAddTodoDialog = ref(false);
const showRemoveAllDialog = ref(false);

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

  showAddTodoDialog.value = false;
}
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 1rem;
}

.dialog-content {
  display: grid;
  gap: 2rem;
}

.dialog-content:has(input) {
  width: 60ch;
}

input {
  background: var(--color-base);
  padding: var(--spacing-small);
  width: 100%;
}

input:focus-visible {
  outline: 0;
}
</style>
