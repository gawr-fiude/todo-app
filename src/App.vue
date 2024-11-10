<script setup>
import { defineAsyncComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";

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

const socialLinks = [
  {
    url: "/",
    icon: defineAsyncComponent(
      () => import("@/components/icons/BranchIcon.vue"),
    ),
  },
  {
    url: "/journal",
    icon: defineAsyncComponent(
      () => import("@/components/icons/GithubIcon.vue"),
    ),
  },
  {
    url: "/config",
    icon: defineAsyncComponent(
      () => import("@/components/icons/LinkedinIcon.vue"),
    ),
  },
];
</script>

<template>
  <nav class="content__wrapper">
    <h2 class="content__legend">Navigation</h2>

    <ul>
      <li>
        <RouterLink v-for="link in navLinks" :key="link.url" :to="link.url">
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>

  <main class="content__wrapper">
    <RouterView />
  </main>

  <nav class="socials">
    <ul>
      <li v-for="link in socialLinks" :key="link.url">
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          <component :is="link.icon"></component>
        </a>
      </li>
    </ul>
  </nav>

  <article class="content__wrapper">
    <h2 class="content__legend">Day Summary</h2>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
      dignissimos alias voluptates impedit ab officia! Dignissimos veniam
      laudantium dolorum quae aliquam ad alias ipsum ex distinctio, debitis ipsa
      atque minus.
    </p>
  </article>
</template>

<style scoped>
.content__wrapper {
  position: relative;
  border-radius: 0.5rem;
  padding: 1.5rem;

  outline: 1px solid;
}

.content__wrapper:hover {
  outline: 1px solid var(--ctp-mocha-green);
}

.content__wrapper:focus-within {
  outline: 2px solid var(--ctp-mocha-green);
}

.content__wrapper > .content__legend {
  position: absolute;
  margin-top: -0.7em;
  margin-left: 1rem;
  top: 0;
  left: 0;
  background: var(--ctp-mocha-base);
  width: fit-content;
}

.content__wrapper:focus-within > .content__legend {
  color: var(--ctp-mocha-green);
  font-weight: 600;
}

li > a {
  display: block;
  padding: 0.2rem;
}

li > a:focus,
li > a:hover {
  background: var(--ctp-mocha-green);
  color: var(--ctp-mocha-base);
  outline: none;
}

main {
  grid-column: span 3;
  grid-row: span 3;
}

.socials > ul {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-left: 1.5rem;

  li > a {
    width: 2rem;
    aspect-ratio: 1;
  }
}
</style>
