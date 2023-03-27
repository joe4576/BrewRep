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

const app = createApp(App);

registerPlugins(app);

const userStore = useUserStore();

await userStore.load();

app.mount("#app");
