// 刘凯丽
// 数据管理接口
export default {
  // 这里的this指向会变成Request类

  // 获取表结构
  getTableStructure(table_name) {
    return this.$get('/api/v1/data_manage/table_structure', {
      params: { table_name }
    })
  },

  // 获取数据列表
  requestTableDataList(params) {
    return this.$get('/api/v1/data_manage/data_list', {
      params
    })
  },

  // add接口
  getAddTableData(params) {
    return this.$post('/api/v1/data_manage/create_data', params)
  },
  // 更新接口
  getUpdateTableData(params) {
    return this.$post('/api/v1/data_manage/update_data', params)
  },

  // 删除接口
  delTableData(params) {
    return this.$delete('/api/v1/data_manage/delete_data', { data: params })
  }
}
