/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import type { App } from "vue";
import PortalVue from "portal-vue";

export function registerPlugins(app: App) {
  loadFonts();
  app.use(vuetify).use(pinia).use(PortalVue);
}
