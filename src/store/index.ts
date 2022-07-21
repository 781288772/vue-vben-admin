import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia();
store.use(piniaPluginPersist)
store.use(piniaPluginPersistedstate);
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
