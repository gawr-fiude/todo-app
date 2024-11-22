<template>
  <button
    @click="
      () => {
        show = true;
      }
    "
    variant="primary"
  >
    Add TODO
  </button>

  <DialogPopUp
    :show
    @close-modal="
      () => {
        show = false;
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

const show = ref(false);

function addTodo() {
  todoStore.addTodo({
    label: newTodo.value.label,
    description: newTodo.value.description,
  });

  newTodo.value = {
    name: "",
    description: "",
  };

  show.value = false;
}
</script>

<style scoped>
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
