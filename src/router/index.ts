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
          path: '',
          component: () => import('@/views/Home/index.vue'),
          name: 'home'
        },
        {
          path: 'category/:id',
          component: () => import('@/views/Category/index.vue'),
          name: 'category'
        },
        {
          path: 'category/sub/:id',
          name: 'subCategory',
          component: () => import('@/views/SubCategory/index.vue'),
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      name: 'login'
    },
  ],
  //切换路由的时候滚动到最上方
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
