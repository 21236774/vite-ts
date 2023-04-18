import { app } from '@/plugins/app'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { directive } from '@/plugins/directive'
import { setupGisMap } from '@/plugins/gis'
import { setupLanguage } from '@/language'
import 'vfonts/Lato.css'
import './index.css'

const setupApp = async () => {
  directive(app)

  setupGisMap(app)

  setupStore(app)

  setupLanguage(app)

  await setupRouter(app)

  app.mount('#app')
}
setupApp()
