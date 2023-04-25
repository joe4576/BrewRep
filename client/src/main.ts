/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import { useUserStore } from "@/store/userStore";
import "@/config/firebaseConfig";
import { registerComponents } from "@/plugins/registerComponents";
import router from "./router";

const app = createApp(App);

registerPlugins(app);
registerComponents(app);

const userStore = useUserStore();
await userStore.load();

// regsiter router after user store loaded to prevent redirect to
// login on manual refresh
app.use(router);

app.mount("#app");
