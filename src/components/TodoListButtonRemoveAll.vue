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
    <article class="dialog-content">
      <p>Delete all incomplete TODOs?</p>

      <button variant="primary">Confirm</button>
    </article>
  </DialogPopUp>
</template>

<script setup>
import { ref } from "vue";

import DialogPopUp from "@/components/DialogPopUp.vue";

const showRemoveAllDialog = ref(false);
</script>

<style scoped>
.dialog-content {
  display: grid;
  gap: 1rem;
}
</style>
