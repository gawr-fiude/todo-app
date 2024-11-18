<script setup>
import { RouterView } from "vue-router";

import MainNavigation from "@/components/MainNavigation.vue";
import SocialNavigation from "@/components/SocialNavigation.vue";
</script>

<template>
  <MainNavigation />

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

  <SocialNavigation />
</template>

<style scoped>
main {
  grid-column: span 3;
  grid-row: span 3;
}
</style>
