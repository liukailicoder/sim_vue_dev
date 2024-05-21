import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store/index'
const getRoutesWithMenuItems = (asyncRoutes, menuItems, level = 0) => {
  let routes = [];
  asyncRoutes.forEach(e => {
    let item;
    if (e.meta && e.meta.code) {
      if (hasMenuKey(e.meta.code, menuItems)) item = e;
    } else {
      item = e;
    }
    if (item && item.children) {
      item.children = getRoutesWithMenuItems(e.children, menuItems, level ++);
    }
    if (item) routes.push(item);
  });
  return routes;
}
const hasMenuKey = (key, menuItems) => {
  let result = false;
  (menuItems||[]).forEach(e => {
    if (e.key == key) result = true;
  })
  return result;
}
const state = {
  routes: void 0,
}

const mutations = {
  SET_ROUTES(state, value) {
    state.routes = value;
  }
}

const actions = {
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
