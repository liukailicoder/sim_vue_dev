// 刘凯丽
// 案例接口
export default {
  // 这里的this指向会变成Request类

  // 获取案例列表
  requestCaseList(params) {
    return this.$post('/api/v1/simulation_case/list', params)
  }
}
