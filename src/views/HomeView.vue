<template>
  <div class="button-group">
    <TodoListButtonAddItem />
    <TodoListButtonRemoveAll />
  </div>

  <ul class="todo-list">
    <li v-for="todo in todoStore.todos" :key="todo.createdDate + todo.label">
      <TodoListItem :todo />
    </li>
  </ul>
</template>

<script setup>
import TodoListButtonAddItem from "@/components/TodoListButtonNewItem.vue";
import TodoListButtonRemoveAll from "@/components/TodoListButtonRemoveAll.vue";
import TodoListItem from "@/components/TodoListItem.vue";

import { useTodoStore } from "@/stores/todos.js";
const todoStore = useTodoStore();
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
</style>
