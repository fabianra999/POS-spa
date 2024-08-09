// Plugins
import { registerPlugins } from '@/plugins'
import * as filters from '@/utils/filters'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.config.globalProperties.$filters = filters

registerPlugins(app)


app.mount('#app')
