import enUS from './en-US'
import zhCN from './zh-CN'

export default {
  'en-US': enUS,
  'zh-CN': zhCN,
  // 兼容某些地方使用 zh 作为 locale（例如旧配置/浏览器自动推断）
  zh: zhCN,
}
