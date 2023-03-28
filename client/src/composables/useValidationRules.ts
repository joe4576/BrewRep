type ValidationRule = (item: any) => boolean | string;

/**
 * Validation rules to pass to input components' `:rules`
 * prop.
 */
export function useValidationRules() {
  const required: ValidationRule = (item) => {
    if (typeof item === "string") {
      if (item.trim().length === 0) {
        return "This value is required";
      }
    }

    if (item !== null || item !== undefined) {
      return true;
    }

    return "This value is required";
  };

  return {
    required,
  };
}
