// 刘凯丽
// 仿真运行接口
export default {
  // 这里的this指向会变成Request类

  // 获取仿真列表
  requestSimulationList(params) {
    return this.$post('/api/v1/simulation_running/list', params)
  },
  // 仿真运行-启动-暂停-停止
  requestSimulationOpertion(action, expt_id) {
    // action = start , pause, stop
    const _apiUrl = `/api/v1/simulation_running/` + action
    return this.$get(_apiUrl, { params: { expt_id } })
  },
  // 仿真运行-详情
  requestSimulationDetail(expt_id) {
    return this.$get('/api/v1/simulation_running/detail', { params: { expt_id } })
  },
  // 合同类型
  requestSimulationCType() {
    return this.$get('/api/v1/simulation_running/list_CType')
  },
  // 零售类型
  requestSimulationCTrMode() {
    return this.$get('/api/v1/simulation_running/list_CTrMode')
  },
  // 图表分析数据
  requestSimulationAnalysisChart(params) {
    return this.$get('/api/v1/simulation_running/detail_analysis', { params })
  },
  // 表格数据
  requestSimulationAnalysisTable(params) {
    return this.$get('/api/v1/simulation_running/detail_analysis_table', { params })
  },
  // 实时步长，总步长
  requestSimulationStep(params) {
    return this.$get('/api/v1/simulation_running/max_step', { params })
  }
}
