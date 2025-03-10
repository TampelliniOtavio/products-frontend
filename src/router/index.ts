import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EditProductView from '@/views/EditProductView.vue'

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
    },
    {
      path: '/products/:id',
      name: 'products.edit',
      component: EditProductView,
    }
  ],
})

export default router
