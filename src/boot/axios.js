import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// 从环境变量获取 API baseURL，如果没有则使用相对路径
const getBaseURL = () => {
  // 优先使用环境变量
  if (process.env.BASE_URL) {
    return process.env.BASE_URL
  }
  // 如果在浏览器环境中，使用当前域名
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port ? `:${window.location.port}` : ''
    // 默认使用当前域名的 API 路径
    return `${protocol}//${hostname}${port}/api`
  }
  // 默认使用相对路径
  return '/api'
}

const api = axios.create({ baseURL: getBaseURL() })

// 添加请求拦截器
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器，统一处理错误
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 如果是网络错误（没有 response 对象）
    if (!error.response) {
      // 检查是否是连接错误
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('ERR_NAME_NOT_RESOLVED')) {
        error.isNetworkError = true
        error.networkErrorMessage = '无法连接到服务器，请检查：\n1. 后端服务是否已启动\n2. API 地址配置是否正确\n3. 网络连接是否正常'
      }
    }
    return Promise.reject(error)
  }
)

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
