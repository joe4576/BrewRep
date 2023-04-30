/**
 * Filters out non-unique values from an array
 * @param arr Array to filter
 * @param property Function to extract comparison property
 */
export function filterNonUniqueByProperty<T, U>(
  arr: T[],
  property: (item: T) => U
): T[] {
  return arr.filter(
    (item, i, arr) => arr.findIndex((t) => property(t) === property(item)) === i
  );
}
