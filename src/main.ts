import { app } from '@/plugins/app'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { directive } from '@/plugins/directive'
import 'vfonts/Lato.css'
import './index.css'

const setupApp = async () => {

  directive(app)
  
  setupStore(app)

  await setupRouter(app)
  
  app.mount('#app')
}
setupApp()


