import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { request } from '@/utils/request/Request'
import store from '@/store/index'

const getDefaultState = () => {
  return {
    token: '',
    userinfo: void 0,
    menu: [],
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, value) => {
    state.userinfo = value
  },
  SET_MENU: (state, value) => {
    state.menu = value
  },
}

const actions = {
  // user login
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      // 处理login 
      // /api/v1/base/access_token
      request.$api('user').login(params).then(async res => {
        // const { data } = response
        commit('SET_TOKEN', res.data.access_token);
        // 设置token后 去获取关联的用户信息和权限信息
        let userData = await this.dispatch('user/getInfo', res.data.access_token);
        if (userData) {
          resolve();
        } else {
          this.dispatch('user/logout');
          reject('登录失败')
        }
      }).catch(err => {
        reject(err)
      })
    })
  },

  // get user info
  getInfo({ commit, state }, token) {
    return new Promise((resolve, reject) => {
      let queue = [
        request.$api('user').userinfo(),
        request.$api('user').menu(),
      ]
      Promise.all(queue).then(res => {
        commit('SET_USERINFO', res[0].data)
        commit('SET_MENU', res[1].data)
        resolve(res)
      }).catch(error => {
        reject(void 0);
      });
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      try {
        resetRouter()
        // 这里也要清空路由参数
        console.log(state);
        store.dispatch('permission/reset');
        commit('RESET_STATE')
        resolve();
      } catch (error) {
        reject()
      }
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

