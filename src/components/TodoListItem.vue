<template>
  <li
    @keyup.delete="
      () => {
        console.log(`delete item ${todo.label}`);
      }
    "
    @keyup.enter="
      () => {
        console.log(`Enter on parent`);
      }
    "
    @click="
      () => {
        console.log(`enter on parent`);
      }
    "
    class="todo-item"
    tabindex="0"
  >
    <span> {{ todo.label }} [{{ show }}] </span>

    <div class="button-group">
      <button
        @click="
          () => {
            console.log('action clicked');
          }
        "
        class="todo-item__action"
      >
        <EditIcon />
      </button>

      <button class="todo-item__action">
        <CancelIcon />
      </button>

      <button class="todo-item__action">
        <CheckIcon />
      </button>
    </div>
  </li>

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
import EditIcon from "./icons/EditIcon.vue";
import CancelIcon from "./icons/CancelIcon.vue";
import CheckIcon from "./icons/CheckIcon.vue";

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
.button-group {
  display: flex;
  gap: 1rem;
  height: fit-content;
}

.todo-item {
  width: 100%;
  text-align: left;

  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 0.2rem 0.2rem 0.2rem 0;
}

.todo-item:focus,
.todo-item:focus-within,
.todo-item:hover {
  background: var(--color-primary);
  color: var(--color-base);
  outline: none;
  cursor: pointer;
}

.todo-item__action {
  width: 1.5rem;
  aspect-ratio: 1;
  padding: 0.2rem;
}

.todo-item__action:focus,
.todo-item__action:hover {
  background: var(--color-base);
  color: var(--color-primary);
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
