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

const app = createApp(App);

registerPlugins(app);
registerComponents(app);

const userStore = useUserStore();

await userStore.load();

app.mount("#app");
