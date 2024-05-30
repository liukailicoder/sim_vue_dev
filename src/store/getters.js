const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userinfo: state => state.user.userinfo,
  menu: state => state.user.menu,
  routesFlag: state => state.permission.flag,
  routes: state => state.permission.routes
}
export default getters
