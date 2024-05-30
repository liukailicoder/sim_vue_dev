import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // 框架本身自带的
import '@/assets/css/index.scss' // 后加的

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 注册全局组件
const uiFiles = require.context('@/components/autoRegister', true, /\.vue$/)
uiFiles.keys().forEach(uiPath => {
  const uiName = uiPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = uiFiles(uiPath)
  Vue.component(uiName, value.default)
});

// 引入请求框架
import { requestMounting } from './utils/request/Request'
Vue.use(requestMounting);
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
