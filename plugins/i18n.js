import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: 'zh-CN',
    messages: {
      'en-US': require('~/locales/lang/en.js'),
      'zh-CN': require('~/locales/lang/zh.js')
    }
  })
}