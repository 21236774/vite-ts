import { createPinia } from 'pinia'
import type { App } from 'vue';

export const setupStore = (app: App) => {
  const store = createPinia();
  app.use(store);
}

export * from './modules'
