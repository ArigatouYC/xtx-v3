// 把components中的所组件都进行全局化注册
// 通过插件的方式
import ImageView from '@/components/ImageView/index.vue'
import Sku from '@/components/XtxSku/index.vue'

export const componentPlugin = {
    install(app: any) {
        // app.component('组件名字'，组件配置对象)
        app.component('ImageView', ImageView)
        app.component('Sku', Sku)
    }
}