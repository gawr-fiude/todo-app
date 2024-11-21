<template>
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
</template>

<script setup>
import { ref } from "vue";
import { datetime, RRule } from "rrule";

import DialogPopUp from "@/components/DialogPopUp.vue";

import { useTodoStore } from "@/stores/todos.js";
const todoStore = useTodoStore();

const newTodo = ref({
  label: "",
  description: "",
});

const showAddTodoDialog = ref(false);

function addTodo() {
  const now = new Date();

  const rule = new RRule({
    freq: RRule.DAILY,
    interval: 1,
    dtstart: datetime(now.getFullYear(), now.getMonth() + 1, now.getDate()),
    until: datetime(now.getFullYear(), now.getMonth() + 1, now.getDate()),
  });

  todoStore.addTodo({
    id: crypto.randomUUID(),
    label: newTodo.value.label,
    description: newTodo.value.description,
    dateCreated: new Date(),
    dateRule: rule.toString(),
  });

  newTodo.value = {
    name: "",
    description: "",
  };

  showAddTodoDialog.value = false;
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
