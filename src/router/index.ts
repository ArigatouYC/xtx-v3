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
        {
          path: 'detail/:id',
          component: () => import('@/views/Detail/index.vue'),
          name: 'detail'
        },
        {
          path: 'cartlist',
          component: () => import('@/views/cartList/index.vue'),
          name: 'cartlist'
        },
        {
          path: 'checkout',
          component: () => import('@/views/checkOut/index.vue'),
          name: 'checkout'
        },
        {
          path: 'pay',
          component: () => import('@/views/Pay/index.vue'),
          name: 'pay'
        },
        {
          path: 'paycallback',
          component: () => import('@/views/Pay/PayBack.vue'),
          name: 'paycallback'
        },

        {
          path: 'member',
          component: () => import('@/views/Member/index.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/Member/components/UserInfo.vue')
            },
            {
              path: 'order',
              component: () => import('@/views/Member/components/UserOrder.vue')
            }
          ]
        }
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
