<script setup>
import { RouterView } from "vue-router";

import MainNavigation from "@/components/MainNavigation.vue";
import SocialNavigation from "@/components/SocialNavigation.vue";
import CheatSheet from "@/components/CheatSheet.vue";
</script>

<template>
  <MainNavigation />

  <main
    class="content__wrapper content__padding--vertical content__padding--horizontal"
  >
    <h2 class="content__legend">
      {{ new Date().toISOString().split("T")[0] }}
    </h2>

    <RouterView />
  </main>

  <article
    class="content__wrapper content__padding--vertical content__padding--horizontal"
  >
    <h2 class="content__legend">Day Summary</h2>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
      dignissimos alias voluptates impedit ab officia! Dignissimos veniam
      laudantium dolorum quae aliquam ad alias ipsum ex distinctio, debitis ipsa
      atque minus.
    </p>
  </article>

  <SocialNavigation />

  <CheatSheet />
</template>

<style scoped>
main {
  grid-column: span 3;
  grid-row: span 3;
}

footer {
  grid-column: span 4;
}
</style>
