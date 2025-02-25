import { createRouter, createWebHistory } from 'vue-router';
import FirstTaskView from '../views/FirstTaskView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/first-task',
      name: 'home',
      component: FirstTaskView,
    },
    {
      path: '/second-task',
      name: 'second-task',
      component: () => import('../views/SecondTaskView.vue'),
    },
  ],
});

export default router;
