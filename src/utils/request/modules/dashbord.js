/*
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-27 15:38:47
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 21:59:03
 */
//首页
export default {
  homeInfo() {
    return this.$get(`/api/v1/homepage/info`)
  },
  homeStatus(publish_state) {
    let params = {
      publish_state
    }
    if (publish_state) params.publish_state = publish_state
    return this.$get(`/api/v1/homepage/main_resource_stat`, { params })
  },
  homeCaseData() {
    return this.$get(`/api/v1/homepage/run_case_data`)
  }
  
  

}