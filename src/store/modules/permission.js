import store from '@/store/index'
import Layout from '@/layout'

const getRoutesWithMenuItems = (asyncRoutes, appendNames = [], level = 0) => {
  let routes = [];
  asyncRoutes.forEach(e => {
    let appendName = appendNames
    let item;
    if (e.component == 'Layout') {
      // 这里手动去除下/
      item = {
        path: `/${e.path}`,
        component: Layout,
        name: `${appendName.join('_')}_${e.path}`.toUpperCase(),
        redirect: e.redirect,
        meta: { title: e.name, icon: e.icon }
      }
    } else {
      // 多兼容几类
      let component;
      try {
        component = require(`@/views${e.component}`).default  
      } catch (error) {
        try {
          component = require(`@/views${e.component}/index.vue`).default 
        } catch (error) {
          component =  () => import(`@/views${e.component}`) 
        }
      }
      item = {
        path: `${e.path}`,
        name: `${appendName.join('_')}_${e.path}`.toUpperCase(),
        component,
        meta: { title: e.name, icon: e.icon, query_string: e.query_string }
      };
    }
    if (e.redirect)
      item.redirect = e.redirect,
        appendName.push(e.path);
    if (e.children) item.children = getRoutesWithMenuItems(e.children, appendNames, ++level);
    routes.push(item);
  });
  return routes;
}
const state = {
  routes: void 0,
  flag: false,
}

const mutations = {
  SET_ROUTES(state, value) {
    state.routes = value;
  },
  SET_FLAG(state, value) {
    state.flag = value
  }
}

const actions = {
  reset({ commit, state }) {
    state = Object.assign(state, {
      routes: void 0,
      flag: false,
    });
  },
  setRoutes({ commit }, router) {
    return new Promise(resolve => {
      let asyncRoutes = store.getters.menu
      let routes = getRoutesWithMenuItems(asyncRoutes);
      // 这里直接加路由
      router.addRoutes(routes)
      console.log('动态路由', routes);
      commit('SET_ROUTES', routes);
      commit('SET_FLAG', true);
      resolve(routes);
    })
  },
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let routes = getRoutesWithMenuItems(asyncRoutes, store.getters.userinfo.menuItems);
      commit('SET_ROUTES', routes);
      resolve(routes);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
