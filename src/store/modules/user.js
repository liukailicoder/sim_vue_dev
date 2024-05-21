import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { request } from '@/utils/request/Request'


const getDefaultState = () => {
  return {
    token: '',
    userinfo: {},
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
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 处理login 
      // /api/v1/base/access_token
      request.$api('user').login({ username: username.trim(), password: password }).then(async res => {
        // const { data } = response
        console.log('拿到的返参', res);
        commit('SET_TOKEN', res.data.access_token);
        // 设置token后 去获取关联的用户信息和权限信息
        let userData = await this.dispatch('user/getInfo', res.data.access_token);
        console.log('拿到的userData');
        if (userData) {
          resolve();
        } else {
          this.dispatch('user/logout');
          reject('登录失败')
        }
      }).catch(err => {
        console.log(err);
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
        console.log(res);
        state.userinfo = res[0].data
        state.menu = res[1].data
        resolve(res)
      }).catch(error => {
        console.log(error);
        reject(void 0);
      });
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      try {
        resetRouter()
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

