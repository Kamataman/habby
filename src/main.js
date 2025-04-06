import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";
import "./registerServiceWorker";

import { Quasar } from "quasar";
import quasarLang from "quasar/lang/ja";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);
app.use(pinia);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
});

app.mount("#app");
