/**
 * Combines class names, filtering out falsy values.
 * Useful for conditional classes: `classNames("base", condition && "modifier")`
 *
 * @param classes - Class name strings or falsy values
 * @returns Space-separated string of valid class names
 */
export const classNames = (...classes: Array<string | boolean | null | undefined>): string => {
  return classes.filter(Boolean).join(" ");
};
