import { ref, Ref } from "vue";

/**
 * Creates a ref from a raw object and casts to the
 * correct type. Prevents any type "unravelling" that Vue
 * might be doing.
 *
 * @param raw Raw object to create ref from
 * @returns ref of the raw object
 */
export function refNoUnwrap<T>(raw: object): Ref<T> {
  return ref(raw) as Ref<T>;
}
