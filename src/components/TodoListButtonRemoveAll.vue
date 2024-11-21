<template>
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

  <DialogPopUp
    :show="showRemoveAllDialog"
    @close-modal="
      () => {
        showRemoveAllDialog = false;
      }
    "
  >
    <form @submit.prevent="todoStore.removeAll()" class="dialog-content">
      <p>Delete all incomplete TODOs?</p>

      <button type="submit" variant="primary">Confirm</button>
    </form>
  </DialogPopUp>
</template>

<script setup>
import { ref } from "vue";

import DialogPopUp from "@/components/DialogPopUp.vue";

import { useTodoStore } from "../stores/todos.js";
const todoStore = useTodoStore();

const showRemoveAllDialog = ref(false);
</script>

<style scoped>
.dialog-content {
  display: grid;
  gap: 1rem;
}
</style>
