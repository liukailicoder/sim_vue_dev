import store from '../../../store'
export default {
  //角色管理 --角色列表
  roleList(page, page_size, role_name) {
    let params = {
      page, page_size,
    }
    if (role_name) params.role_name = role_name
    return this.$get(`/api/v1/role/list`, { params })
  },
  //角色管理--新建角色
  createRole(params) {
    return this.$post('api/v1/role/create', params)
  },
  //角色管理--编辑角色
  updateRole(params) {
    return this.$post('api/v1/role/update', params)
  },
  //角色管理--删除角色
  deleteRole(role_id) {
    let params = { role_id }
    return this.$delete('api/v1/role/delete', { params })
  },


  //API管理
  APIList(page = 1, page_size = 9999, path, summary, tags) {
    let params = {
      page, page_size,
    }
    if (path) params.path = path
    if (summary) params.summary = summary
    if (tags) params.tags = tags
    return this.$get(`api/v1/api/list`, { params })
  },
  //API管理--创建API
  createAPI(params) {
    return this.$post('api/v1/api/create', params)
  },
  //API管理--编辑API
  updateAPI(params) {
    return this.$post('api/v1/api/update', params)
  },
  //API管理--删除API
  deleteAPI(api_id) {
    let params = { api_id }
    return this.$delete('api/v1/api/delete', { params })
  },
  //用户管理--用户列表
  userList(page, page_size, userName, email) {
    let params = {
      page, page_size,
    }
    if (userName) params.userName = userName;
    if (email) params.email = email;
    return this.$get(`/api/v1/user/list`, { params })
  },
  //用户管理--创建用户
  createUser(params) {
    return this.$post('api/v1/user/create', params)
  },
  //用户管理--更新用户
  updateUser(params) {
    return this.$post('api/v1/user/update', params)
  },
  //用户管理--删除用户
  deleteUser(api_id) {
    let params = { api_id }
    return this.$delete('api/v1/user/delete', { params })
  },
  //用户管理-- 上传图片
  uploadImg() {
    return this.$delete('api/v1/base/upload_image')
  },

  
  // 菜单列表
  menuList(page = 1, page_size = 9999) {
    return this.$get('api/v1/menu/list', { params: { page, page_size } });
  },
  // 更新菜单
  updateMenu(params) {
    return this.$post('api/v1/menu/update', params);
  },

  // 获取用户权限
  getAuthorized(id) {
    return this.$get('api/v1/role/authorized?id=' + id || store.getters.userinfo.id);
  },
  // 设置用户权限
  
  setAuthorized(params) {
    return this.$post('api/v1/role/authorized', params);
  }

}