import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../pages/Home.vue") },
  { path: "/login", component: () => import("../pages/Login.vue") },
  { path: "/register", component: () => import("../pages/Register.vue") },
  { path: "/rides", component: () => import("../pages/SearchRides.vue") },
  { path: "/create-ride", component: () => import("../pages/CreateRide.vue") }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
