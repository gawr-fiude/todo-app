<template>
  <div class="button-group">
    <TodoListButtonAddItem />
    <TodoListButtonRemoveAll />
  </div>

  <ul class="todo-list">
    <TodoListItem
      v-for="todo in todoStore.todos"
      :key="todo.createdDate + todo.label"
      :todo
      @dialog-update="openDialogUpdate(todo)"
      @dialog-remove="openDialogRemove(todo)"
      @dialog-complete="openDialogComplete(todo)"
    />
  </ul>

  <DialogPopUp
    :show="showUpdate"
    @close-modal="
      () => {
        showUpdate = false;
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

  <DialogPopUp :show="showRemove">
    <form @submit.prevent="removeTodo" class="dialog-content">
      <p>Delete this TODO?</p>

      <button type="submit" variant="primary">Confirm</button>
    </form>
  </DialogPopUp>

  <DialogPopUp :show="showComplete">
    <form @submit.prevent="completeTodo" class="dialog-content">
      <p>Complete this TODO?</p>

      <button type="submit" variant="primary">Confirm</button>
    </form>
  </DialogPopUp>
</template>

<script setup>
import { ref } from "vue";

import TodoListButtonAddItem from "@/components/TodoListButtonNewItem.vue";
import TodoListButtonRemoveAll from "@/components/TodoListButtonRemoveAll.vue";
import TodoListItem from "@/components/TodoListItem.vue";
import DialogPopUp from "@/components/DialogPopUp.vue";

import { useTodoStore } from "@/stores/todos.js";
const todoStore = useTodoStore();

const showUpdate = ref(false);
const showRemove = ref(false);
const showComplete = ref(false);

const id = ref();
const label = ref();
const description = ref();

function openDialogUpdate(todo) {
  id.value = todo.id;
  label.value = todo.label;
  description.value = todo.description;

  showUpdate.value = true;
}

function updateTodo() {
  todoStore.updateTodo(id.value, {
    label: label.value,
    description: description.value,
  });

  showUpdate.value = false;
}

function openDialogRemove(todo) {
  id.value = todo.id;

  showRemove.value = true;
}

function removeTodo() {
  todoStore.removeTodo(id.value);

  showRemove.value = false;
}

function openDialogComplete(todo) {
  id.value = todo.id;

  showComplete.value = true;
}

function completeTodo() {
  todoStore.completeTodo(id.value);

  showComplete.value = false;
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
