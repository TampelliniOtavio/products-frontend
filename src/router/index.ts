import { createRouter, createWebHistory } from 'vue-router'
import EditProductView from '@/views/EditProductView.vue'
import ListProductsView from '@/views/ListProductsView.vue'

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
      component: ListProductsView,
    },
    {
      path: '/products/:id',
      name: 'products.edit',
      component: EditProductView,
    }
  ],
})

export default router
