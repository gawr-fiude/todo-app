<script setup>
import { RouterView } from "vue-router";

import NavigationMain from "@/components/NavigationMain.vue";
import NavigationSocial from "@/components/NavigationSocial.vue";
</script>

<template>
  <NavigationMain />

  <main class="wrapper padding--vertical padding--horizontal">
    <h2 class="legend">
      {{ new Date().toISOString().split("T")[0] }}
    </h2>

    <RouterView />
  </main>

  <article class="wrapper padding--vertical padding--horizontal">
    <h2 class="legend">Summary</h2>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
      dignissimos alias voluptates impedit ab officia! Dignissimos veniam
      laudantium dolorum quae aliquam ad alias ipsum ex distinctio, debitis ipsa
      atque minus.
    </p>
  </article>

  <NavigationSocial />
</template>

<style scoped>
main {
  grid-column: span 3;
  grid-row: span 3;
}
</style>
