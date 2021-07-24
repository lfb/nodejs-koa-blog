
export default ({app, store, env}) => {
  app.router.beforeEach( async (to, from, next) => {
    const isLoginStatus = store.state.user.isLoginStatus
    const token = app.$cookies.get(env.BOBLOG_TOKEN)
    if(!isLoginStatus && token) {
      const [err] = await store.dispatch('user/userInfo')
      if(!err) {
        next()
      } else {
        next()
      }
    }
    next()
  })
}
