import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import { en, zh } from './lang'

export const setupLanguage = (app: App) => {
  const messages = {
    en,
    zh
  }
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    messages
  })
  app.use(i18n)
}
