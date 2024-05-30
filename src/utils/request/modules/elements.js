import { create } from "lodash"

/*
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-29 22:02:39
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-29 22:30:19
 */
export default {
  createElement() {
    return this.$post('/api/v1/simulation_element/create')
  }
}