import BrDialog from "@/components/dialogs/BrDialog.vue";
import BrBtn from "@/components/input/BrBtn.vue";
import BrDropdown from "@/components/input/BrDropdown.vue";
import BrText from "@/components/input/BrText.vue";
import BrDate from "@/components/input/specialised/BrDate.vue";
import { App } from "vue";

/**
 * Globally register Vue components
 */
export function registerComponents(app: App) {
  app.component("BrText", BrText);
  app.component("BrBtn", BrBtn);
  app.component("BrDialog", BrDialog);
  app.component("BrDropdown", BrDropdown);
  app.component("BrDate", BrDate);
}
