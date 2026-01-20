<template>
  <q-layout view="lHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="row">
          <q-avatar>
            <img :src="appLogo" />
          </q-avatar>
          <div style="margin-top: 5px">&nbsp;&nbsp;{{ $t('system.name') }}</div>
        </q-toolbar-title>
        <q-btn-dropdown
          stretch
          flat
          :label="lang.label === undefined ? this.$t('langs.header') : lang.label"
        >
          <q-list dense>
            <q-item-label
              header
              style="text-align: left; border-bottom: 1px dashed #d6d6d6; padding: 8px"
              >{{ $t('langs.title') }}
            </q-item-label>
            <q-item
              v-for="n in langs"
              :key="n.value"
              v-close-popup
              clickable
              style="text-align: left; border-bottom: 1px dashed #d6d6d6; padding: 6px"
              :class="lang.value === n.value ? 'text-primary' : 'text-grey-7'"
              @click="setlanguage(n)"
            >
              <q-item-section avatar style="min-width: 30px">
                <q-icon size="25px" name="directions" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ n.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!--    <q-footer bordered class="bg-white text-black">-->
    <!--      <q-toolbar>-->
    <!--        <q-toolbar-title>-->
    <!--          <q-avatar>-->
    <!--            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />-->
    <!--          </q-avatar>-->
    <!--          Title-->
    <!--        </q-toolbar-title>-->
    <!--      </q-toolbar>-->
    <!--    </q-footer>-->
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import appLogo from '../assets/quasar-logo-vertical.svg'

export default defineComponent({
  data() {
    return {
      appLogo: appLogo,
      langs: [
        {
          label: '中文',
          value: 'zh-CN',
        },
        {
          label: 'English',
          value: 'en-US',
        },
      ],
      lang: this.$i18n.locale,
    }
  },
  watch: {
    lang(lang) {
      if (lang && lang.value) {
        this.$i18n.locale = lang.value
        // 保存到本地存储
        this.$q.localStorage.set('locale', lang.value)
        // set quasar's language too!!
        const langMap = {
          'zh-CN': () => import('quasar/lang/zh-CN'),
          'en-US': () => import('quasar/lang/en-US'),
        }
        const langLoader = langMap[lang.value]
        if (langLoader) {
          langLoader()
            .then((language) => {
              this.$q.lang.set(language.default)
            })
            .catch((err) => {
              console.warn(`Quasar language pack for ${lang.value} not found, using default`, err)
            })
        } else {
          console.warn(`Unsupported locale: ${lang.value}, using default`)
        }
      }
    },
  },
  mounted() {
    // 从本地存储恢复语言设置
    const savedLocale = this.$q.localStorage.getItem('locale') || this.$i18n.locale
    this.lang = this.langs.find((lan) => lan.value === savedLocale) || this.langs[0]
    // 初始化 Quasar 语言包
    const langMap = {
      'zh-CN': () => import('quasar/lang/zh-CN'),
      'en-US': () => import('quasar/lang/en-US'),
    }
    const langLoader = langMap[savedLocale]
    if (langLoader) {
      langLoader()
        .then((language) => {
          this.$q.lang.set(language.default)
        })
        .catch((err) => {
          console.warn(`Quasar language pack for ${savedLocale} not found, using default`, err)
        })
    }
  },
  methods: {
    setlanguage(lang) {
      this.lang = lang
    },
  },
})
</script>
