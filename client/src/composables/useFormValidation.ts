import { CFormInterface } from "@/components/input/BrForm.vue";
import { ref } from "vue";

/**
 * Pass the form value from this composable to
 * BrForm as a ref to gain access to exposed form validation
 * functions.
 */
export function useFormValidation() {
  const form = ref<CFormInterface>();

  return {
    form,
  };
}
