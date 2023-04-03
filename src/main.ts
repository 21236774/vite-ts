import { app } from '@/plugins/app'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { directive } from '@/plugins/directive'
import { setupLanguage } from '@/language'
import 'vfonts/Lato.css'
import './index.css'

const setupApp = async () => {

  directive(app)
  
  setupStore(app)

  setupLanguage(app)

  await setupRouter(app)
  
  app.mount('#app')
}
setupApp()

export const toThousands = (num: any, def = '') => {
  const validNum = parseFloat(num)
  if (isNaN(validNum)) return def ?? num

  const [integerPart, decimalPart] = validNum.toString().split('.')
  const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const formattedNum = `${integerFormatted}${decimalPart ? `.${decimalPart}` : ''}`

  return formattedNum
}

console.log(toThousands('十多个十多个', '666'));


