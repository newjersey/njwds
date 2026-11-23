/**
 * Registers a custom element without ever throwing on a second registration.
 *
 * Two copies of Grove can end up on one page (the CDN bundle plus an npm-bundled
 * copy, or two CDN versions), and customElements.define throws if the tag is taken.
 * The same class registering again is a no-op; a different class (another copy or
 * version) keeps the first registration and warns, so a mismatch is visible.
 */
export function defineElement(tag: string, elementClass: CustomElementConstructor): void {
  const registered = customElements.get(tag);

  if (!registered) {
    customElements.define(tag, elementClass);
  } else if (registered !== elementClass) {
    console.warn(
      `<${tag}> is already registered by a different class, probably another copy or version of Grove on this page. Keeping the first registration.`,
    );
  }
}
