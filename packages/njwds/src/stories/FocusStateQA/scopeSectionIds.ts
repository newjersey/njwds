const ID_REF_ATTRS = ["for", "aria-describedby", "aria-labelledby", "aria-controls", "aria-owns"];

/**
 * Rewrites every id inside `root` to prevent id collisions
 */
export const scopeSectionIds = (root: Element, prefix: string): void => {
  root.querySelectorAll<HTMLElement>("[id]").forEach((el) => {
    el.id = `${prefix}--${el.id}`;
  });

  root.querySelectorAll(ID_REF_ATTRS.map((attr) => `[${attr}]`).join(",")).forEach((el) => {
    ID_REF_ATTRS.forEach((attr) => {
      const value = el.getAttribute(attr);
      if (!value) return;
      el.setAttribute(
        attr,
        value
          .split(/\s+/)
          .map((token) => `${prefix}--${token}`)
          .join(" "),
      );
    });
  });
};
