<template>
  <nav class="wrapper padding--vertical padding--horizontal">
    <h2 class="legend">Navigation</h2>

    <button
      @click="
        () => {
          $emit('focus-main');
        }
      "
      id="skip-to-content"
      class="legend"
    >
      Skip to Content
    </button>

    <ul>
      <li>
        <RouterLink v-for="link in navLinks" :key="link.url" :to="link.url">
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineEmits(["focus-main"]);

const navLinks = [
  {
    label: "TODOs",
    url: "/",
  },
  {
    label: "Journal",
    url: "/journal",
  },
  {
    label: "Config",
    url: "/config",
  },
];
</script>

<style scoped>
#skip-to-content {
  display: block;
  padding: 0.2rem;
  opacity: 0;
  transform: translateY(-300%);
}

#skip-to-content:focus,
#skip-to-content:hover {
  background: var(--color-primary);
  color: var(--color-base);
  outline: none;

  opacity: 1;
  transform: translateY(0);
}

li > a {
  display: block;
  padding: 0.2rem;
}
</style>
