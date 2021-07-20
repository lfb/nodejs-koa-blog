
export default ({ $axios, redirect, store, app, env, error, $sentry, route }) => {
    $axios.onRequest(config => {
      config.baseURL = process.env.BASE_URL
      console.log('process.env.BASE_URL', process.env.BASE_URL)
    })
    $axios.onResponse(response => {
      return response
    })
    $axios.onError(err => {
      console.log(err)
    })
}
