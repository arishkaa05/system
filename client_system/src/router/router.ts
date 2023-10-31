import Main from "../pages/Main.vue";
import ExpertPage from "../pages/ExpertPage.vue";
import Login from "../pages/Login.vue";
import PatientPage from "../pages/PatientPage.vue";
import Registration from "../pages/Registration.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/registration",
    component: Registration,
  },
  {
    path: "/expert",
    component: ExpertPage,
  },
  {
    path: "/patient",
    component: PatientPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
