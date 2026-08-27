/**
 * Combines multiple class names into a single string.
 * This is a lightweight alternative to clsx/tailwind-merge for simple use cases.
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
