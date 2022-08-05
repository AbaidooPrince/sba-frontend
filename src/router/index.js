import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import admin from "./admin";
import results from "./results";
import students from "./students";

const index = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/auth",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/DashboardView.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/student/new",
    name: "AddStudent",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/NewStudentView.vue"),
    meta: {
      auth: true,
    },
  },
];
const routes = index.concat(results, admin, students);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
