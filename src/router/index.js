import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/journal",
      name: "journal",
      component: () => import("@/views/JournalView.vue"),
    },
    {
      path: "/config",
      name: "config",
      component: () => import("@/views/ConfigView.vue"),
    },
  ],
});

export default router;
