import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'products.list' },
    },
    {
      path: '/products',
      name: 'products.list',
      component: HomeView,
    }
  ],
})

export default router
