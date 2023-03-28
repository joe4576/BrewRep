import { App } from "vue";
import BrText from "@/components/input/BrText.vue";
import BrBtn from "@/components/input/BrBtn.vue";

/**
 * Globally register Vue components
 */
export function registerComponents(app: App) {
  app.component("BrText", BrText);
  app.component("BrBtn", BrBtn);
}
