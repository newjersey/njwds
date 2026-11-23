@use "../../sass/uswds-theme"; // Grove's own Sass: always a relative path
@use "uswds-core" as *; // USWDS modules: bare names only

// If this file is also forwarded into the global stylesheet (--css-class), only rules
// that are valid outside a shadow root belong here. Shadow-only CSS (:host, ::slotted)
// lives in the component.

.grove-{{name}} {
  color: var(--grove-{{name}}-color, #{color("ink")});
}
