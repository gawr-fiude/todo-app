<template>
  <aside>
    <NavigationMain @focus-main="focusMain" />

    <article class="wrapper padding--vertical padding--horizontal">
      <h2 class="legend">Summary</h2>

      <p>Current Tasks: n/N</p>
    </article>

    <NavigationSocial />
  </aside>

  <main
    ref="main"
    tabindex="-1"
    class="wrapper padding--vertical padding--horizontal"
  >
    <h2 class="legend">
      {{ new Date().toISOString().split("T")[0] }}
    </h2>

    <RouterView />
  </main>
</template>

<script setup>
import { useTemplateRef } from "vue";
import { RouterView } from "vue-router";

import NavigationMain from "@/components/NavigationMain.vue";
import NavigationSocial from "@/components/NavigationSocial.vue";

const main = useTemplateRef("main");

function focusMain() {
  main.value.focus();
}
</script>

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
