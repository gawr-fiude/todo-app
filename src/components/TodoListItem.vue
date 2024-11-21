<template>
  <button
    @click="
      () => {
        resetForm();
        show = true;
      }
    "
    class="todo-item"
  >
    {{ todo.label }} [{{ show }}]
  </button>

  <DialogPopUp
    :show
    @close-modal="
      () => {
        show = false;
      }
    "
  >
    <article class="dialog-content">
      <form @submit.prevent="updateTodo" class="dialog-content">
        <fieldset class="wrapper">
          <legend class="legend">Label</legend>
          <input v-model="label" type="text" />
        </fieldset>

        <fieldset class="wrapper">
          <legend class="legend">Description</legend>
          <input v-model="description" type="text" />
        </fieldset>

        <button type="submit" variant="primary">Update</button>
      </form>
    </article>
  </DialogPopUp>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { datetime, rrulestr } from "rrule";

import DialogPopUp from "./DialogPopUp.vue";

import { useTodoStore } from "@/stores/todos.js";
const todoStore = useTodoStore();

const props = defineProps({
  todo: Object,
});

const show = ref(false);

const dateUntil = computed(() => {
  const date = rrulestr(props.todo.dateRule).options.until;
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getUTCDate()}`;
});

const label = ref();
const description = ref();
onMounted(() => {
  resetForm();
});

function resetForm() {
  label.value = props.todo.label;
  description.value = props.todo.description;
}

function updateTodo() {
  todoStore.updateTodo(props.todo.id, {
    label: label.value,
    description: description.value,
  });

  show.value = false;
}
</script>

<style scoped>
.todo-item {
  width: 100%;
  text-align: left;
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
