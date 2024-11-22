<template>
  <li
    tabindex="0"
    @keyup.delete="
      () => {
        $emit('dialog-remove', todo);
      }
    "
    class="todo-item"
  >
    <span>
      {{ todo.label }} {{ todo.dateCompleted ? "[completed]" : "" }}
    </span>

    <div class="button-group">
      <button
        v-if="!todo.dateCompleted"
        @click="
          () => {
            $emit('dialog-update', todo);
          }
        "
        class="todo-item__action"
      >
        <EditIcon />
      </button>

      <button
        @click="
          () => {
            $emit('dialog-remove', todo);
          }
        "
        class="todo-item__action"
      >
        <CancelIcon />
      </button>

      <button
        v-if="!todo.dateCompleted"
        @click="
          () => {
            $emit('dialog-complete', todo);
          }
        "
        class="todo-item__action"
      >
        <CheckIcon />
      </button>
    </div>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { datetime, rrulestr } from "rrule";

import EditIcon from "./icons/EditIcon.vue";
import CancelIcon from "./icons/CancelIcon.vue";
import CheckIcon from "./icons/CheckIcon.vue";

const props = defineProps({
  todo: Object,
});

defineEmits(["dialog-update", "dialog-remove", "dialog-complete"]);

const dateUntil = computed(() => {
  const date = rrulestr(props.todo.dateRule).options.until;
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getUTCDate()}`;
});
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
</style>
