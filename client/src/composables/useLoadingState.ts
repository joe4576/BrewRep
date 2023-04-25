import { ref } from "vue";

/**
 * Wraps an async call and provides a loading state
 *
 * @param callback async call
 * @param onCatch optional callback if the function errors
 * @returns [loading state, wrapped function]
 */
const useLoadingState = <T extends unknown[], U = any>(
  callback: (...args: T) => PromiseLike<U>,
  onCatch?: (e: unknown) => any
) => {
  const isLoading = ref(false);

  const wrappedFn = async (...args: T): Promise<U> => {
    isLoading.value = true;
    try {
      return await callback(...args);
    } catch (e) {
      return onCatch?.(e);
    } finally {
      isLoading.value = false;
    }
  };

  return [isLoading, wrappedFn] as const;
};

export default useLoadingState;
