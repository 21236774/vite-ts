import { app } from '@/plugins/app'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { directive } from '@/plugins/directive'
import { setupGisMap } from '@/plugins/gis'
import { setupLanguage } from '@/language'
import xddUI from 'xdd-ui'
// import 'vfonts/Lato.css'
import '@/assets/styles/md.scss'
import 'highlight.js/styles/github.min.css'
import './index.css'

const setupApp = async () => {
  directive(app)

  setupGisMap(app)

  setupStore(app)

  setupLanguage(app)

  await setupRouter(app)

  app.use(xddUI)

  app.mount('#app')
}
setupApp()
