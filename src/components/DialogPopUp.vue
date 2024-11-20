<template>
  <dialog
    ref="dialog"
    @keydown.esc="
      () => {
        // Dialog uses keydown, so this one has to be keydown as well
        $emit('close-modal');
      }
    "
    @click="closeOnClickOutside"
    class="padding--vertical padding--horizontal"
  >
    <slot></slot>
  </dialog>
</template>

<script setup>
import { useTemplateRef, watch } from "vue";

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["close-modal"]);

const dialog = useTemplateRef("dialog");

watch(props, (newValue, _) => {
  if (newValue.show === true) {
    dialog.value.showModal();
  } else {
    dialog.value.close();
  }
});

// The Dialog should close on clicks outside its main content
// This function makes sure the Dialog is closed, even if the backdrop is clicked
// VueUse's onClickOutside wouldn't work well since the backdrop is still 'inside'
function closeOnClickOutside(event) {
  let rect = dialog.value.getBoundingClientRect();

  let isInDialog =
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width;

  if (!isInDialog) {
    emit("close-modal");
  }
}
</script>

<style scoped>
dialog {
  color: var(--color-text);
  background: var(--color-base);
}

dialog::backdrop {
  background: var(--color-base);
  opacity: 0.8;
}
</style>
