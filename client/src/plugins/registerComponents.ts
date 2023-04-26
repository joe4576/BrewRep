import BrDialog from "@/components/dialogs/BrDialog.vue";
import BrBtn from "@/components/input/BrBtn.vue";
import BrCheckbox from "@/components/input/BrCheckbox.vue";
import BrDropdown from "@/components/input/BrDropdown.vue";
import BrText from "@/components/input/BrText.vue";
import BrDate from "@/components/input/specialised/BrDate.vue";
import BrSubtitle from "@/components/text/BrSubtitle.vue";
import { App } from "vue";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";

/**
 * Globally register Vue components
 */
export function registerComponents(app: App) {
  app
    .component("BrText", BrText)
    .component("BrBtn", BrBtn)
    .component("BrDialog", BrDialog)
    .component("BrDropdown", BrDropdown)
    .component("BrDate", BrDate)
    .component("VSkeletonLoader", VSkeletonLoader)
    .component("BrCheckbox", BrCheckbox)
    .component("BrSubtitle", BrSubtitle);
}
