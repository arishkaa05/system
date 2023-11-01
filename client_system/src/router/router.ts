import Main from "../pages/Main.vue";
import ExpertPage from "../pages/ExpertPage.vue";
import Login from "../pages/Login.vue";
import PatientPage from "../pages/PatientPage.vue";
import Registration from "../pages/Registration.vue";

import { useUserStore } from "../stores/userStore";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
    meta: { layout: "main", auth: true },
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/registration",
    component: Registration,
    meta: { layout: "main", auth: true },
  },
  {
    path: "/expert",
    component: ExpertPage,
    meta: { layout: "main", auth: true },
  },
  {
    path: "/patient",
    component: PatientPage,
    meta: { layout: "main", auth: true },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  checkTokenInCookie()
  if (to.path === "/login" || userStore.user.role === "USER" || checkTokenInCookie()) next();
  else {
    console.log("work");
    next("/login");
  }
});

// Функция для проверки наличия токена в куках
const checkTokenInCookie = () => {
  const cookies = document.cookie.split(";");
  const userStore = useUserStore();
  let name; let role; let isJWT = false;
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("jwt=")) {
      isJWT = true;
    }
    if (cookie.startsWith("name=")) {
      name = cookie.substring('name='.length, cookie.length);
    }
    if (cookie.startsWith("role=")) {
      role = cookie.substring('role='.length, cookie.length);
    }
  }
  if (role && name) userStore.setUserData(role,  name)
  return isJWT;
};

export default router;
