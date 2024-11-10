<template>
  <nav class="socials">
    <ul>
      <li v-for="link in socialLinks" :key="link.url">
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          <component :is="link.icon"></component>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const socialLinks = [
  {
    url: "https://github.com/gawr-fiude/todo-app",
    icon: defineAsyncComponent(
      () => import("@/components/icons/BranchIcon.vue"),
    ),
  },
  {
    url: "https://github.com/gawr-fiude",
    icon: defineAsyncComponent(
      () => import("@/components/icons/GithubIcon.vue"),
    ),
  },
  {
    url: "https://www.linkedin.com/in/eduardo-eiji-goto-926702217/",
    icon: defineAsyncComponent(
      () => import("@/components/icons/LinkedinIcon.vue"),
    ),
  },
];
</script>

<style scoped>
nav > ul {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-small);
  padding-left: var(--spacing-default);
}

li > a {
  display: block;
  width: 2.5rem;
  aspect-ratio: 1;
  padding: 0.5rem;
}

li > a:focus,
li > a:hover {
  background: var(--color-primary);
  color: var(--color-base);
  outline: none;
}
</style>
