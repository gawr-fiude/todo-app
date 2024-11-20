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

  <ul class="todo-list">
    <li v-for="todo in todoStore.todos" :key="todo.createdDate + todo.label">
      <TodoItem :todo />
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
import { datetime, RRule } from "rrule";

import TodoItem from "@/components/TodoItem.vue";
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
.button-group {
  display: flex;
  gap: 1rem;
}

.todo-list {
  display: grid;
  margin-top: 1rem;
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
