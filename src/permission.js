import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = store.getters.token

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {

      // TODO: 这里判断下有没有这个路由, 没有的话 就手动404; 还没做
      const hasGetUserInfo = store.getters.userinfo
      if (hasGetUserInfo) {
        // 先看有没有加路由
        const hasRoles = store.getters.routes && store.getters.routes.length > 0
        console.log('看看有没有路由', hasRoles, store.getters.routes);
        if (!hasRoles) {
          console.log('没路由，新增')
          await store.dispatch('permission/setRoutes', router);
          return next({ ...to, replace: true });
        }
        console.log('当前路由', store.getters.routes, router);
        // 每次都更新
        await store.dispatch('user/getInfo', router).then(e => { });
        next()
      } else {
        try {
          // get user info
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
