<script setup>
import { RouterView } from "vue-router";

import NavigationMain from "@/components/NavigationMain.vue";
import NavigationSocial from "@/components/NavigationSocial.vue";
</script>

<template>
  <aside>
    <NavigationMain />

    <article class="wrapper padding--vertical padding--horizontal">
      <h2 class="legend">Summary</h2>

      <p>Current Tasks: n/N</p>
    </article>

    <NavigationSocial />
  </aside>

  <main class="wrapper padding--vertical padding--horizontal">
    <h2 class="legend">
      {{ new Date().toISOString().split("T")[0] }}
    </h2>

    <RouterView />
  </main>
</template>

<style scoped>
main {
  grid-column: span 3;
}

aside {
  display: grid;
  height: fit-content;
  gap: var(--spacing-default);
}
</style>
