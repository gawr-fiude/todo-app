<template>
  <button
    @click="
      () => {
        show = true;
      }
    "
    variant="primary"
  >
    Remove All
  </button>

  <DialogPopUp
    :show
    @close-modal="
      () => {
        show = false;
      }
    "
  >
    <form @submit.prevent="removeAll" class="dialog-content">
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

const show = ref(false);

function removeAll() {
  todoStore.removeAll();

  show.value = false;
}
</script>

<style scoped>
.dialog-content {
  display: grid;
  gap: 1rem;
}
</style>
