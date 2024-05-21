const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userinfo: state => state.user.userinfo,
  menu: state => state.user.menu,
}
export default getters
