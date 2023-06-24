//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import router from '@/router'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

nprogress.configure({ showSpinner: false })

router.beforeEach(async (to: any, from: any, next: any) => {
  //to:你将要访问那个路由
  //from:你从来个路由而来
  //next:路由的放行函数
  next()
  nprogress.start()
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
