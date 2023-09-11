import Main from '../pages/Main.vue';
import ExpertPage from '../pages/ExpertPage.vue';
import PatientPage from '../pages/PatientPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/expert',
    component: ExpertPage
  },
  {
    path: '/patient',
    component: PatientPage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router
