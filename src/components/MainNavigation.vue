<template>
  <nav
    class="content__wrapper content__padding--vertical content__padding--horizontal"
  >
    <h2 class="content__legend">Navigation</h2>

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
li > a {
  display: block;
  padding: 0.2rem;
}

li > a:focus,
li > a:hover {
  background: var(--color-primary);
  color: var(--color-base);
  outline: none;
}
</style>
