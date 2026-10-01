const idsByMount = new WeakMap<object, string>();

/**
 * Returns a modal DOM id that is stable across re-renders of the same story
 * mount (e.g. Storybook Controls changing args), but unique per mount -
 * even when two mounts are the same story. This matters because Storybook's
 * docs page renders a story into more than one canvas (a "primary" canvas
 * plus a "stories" list canvas), and an id derived from context.name alone
 * would collide between them since both share the same name.
 *
 * Callers must pass Storybook's `context.canvasElement` rather than the
 * `context` object itself: Storybook gives `render()` and `decorators()` two
 * different context object references for the same mount, but the same
 * canvasElement reference - so canvasElement is the only value that is both
 * stable within a mount and distinct across mounts.
 */
export function getStoryModalId(mount: object): string {
  let id = idsByMount.get(mount);
  if (!id) {
    id = `modal-${crypto.randomUUID()}`;
    idsByMount.set(mount, id);
  }
  return id;
}
