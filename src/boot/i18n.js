import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { LocalStorage } from 'quasar'

// 导入 Quasar 语言包
import zhCN from 'quasar/lang/zh-CN'
import enUS from 'quasar/lang/en-US'

// 语言包映射
const quasarLangMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export default defineBoot(({ app }) => {
  // 从本地存储获取用户选择的语言，如果没有则使用默认语言 zh-CN
  const savedLocale = LocalStorage.getItem('locale') || 'zh-CN'
  const defaultLocale = ['zh-CN', 'en-US'].includes(savedLocale) ? savedLocale : 'zh-CN'

  const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: 'zh-CN', // 回退语言
    globalInjection: true,
    messages,
    legacy: false, // 使用 Composition API 模式
  })

  // Set i18n instance on app
  app.use(i18n)

  // 初始化 Quasar 语言包
  // 延迟设置以确保 Quasar 已完全初始化
  setTimeout(() => {
    if (app.config.globalProperties.$q && app.config.globalProperties.$q.lang) {
      const quasarLang = quasarLangMap[defaultLocale] || zhCN
      app.config.globalProperties.$q.lang.set(quasarLang.default || quasarLang)
    }
  }, 0)
})
