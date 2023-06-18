import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      name: 'layout',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          name: 'home'
        },
        {
          path: '/category',
          component: () => import('@/views/Category/index.vue'),
          name: 'category'
        },

      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      name: 'login'
    },

  ]
})

export default router
