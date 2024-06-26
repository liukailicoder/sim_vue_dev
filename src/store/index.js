import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import createPersistedState from 'vuex-persistedstate'
import roles from "./modules/role.js"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    roles
  },
  getters,
  plugins: [  
    // 可以有多个持久化实例  
    createPersistedState({  
      reducer: state => ({ // 需要持久化存储的数据
        user: state.user, // 用户
      }),
      storage: {  // 存储方式定义  都存localStorage
        getItem: (key) => localStorage.getItem(key), // 获取  
        setItem: (key, value) => localStorage.setItem(key, value), // 存储  
        removeItem: (key) => localStorage.removeItem(key) // 删除  
      }
    })  
],
})

export default store
