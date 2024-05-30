/*
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-22 09:28:17
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-22 10:14:52
 */
/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Bai Erbao
 * @Date: 2021-09-19 10:18:29
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2021-10-25 15:25:09
 */

/** 初始化数据 */
const state = {
  roleTableList: [],   // 添加角色表格数据
}
/** 数据处理  */
const getters = {
  getRoleTableList(state) {
    var data = {};
    data = state.roleTableList;
    return data
  },

}
/** 同步函数 */
const mutations = {
  // 添加角色表格数据
  setRoleTableList(state, data) {
    state.roleTableList = data
  },

}
/** 异步函数 */
const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
