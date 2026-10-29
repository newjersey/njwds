# General decisions

## Naming Conventions

Web components should be prefixed with `grove-` (e.g. `<grove-accordion />`)

## Base HTML Elements

Base HTML elements should not be converted to Web components if new functionality isn't being added. In general, base HTML elements should be [customized](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#customized_built-in_elements). If you are just using the element itself with nothing added, lean on regular classes instead of a full component.

## Component Styling Ownership

A component owns every context it needs to render consistently in, including appearing unclassed inside another container (e.g. a bare `<table>` typed into `.usa-prose` content). That selector belongs in the component's own file, added to its canonical selector — never duplicated into, or overridden from, the container's file. Containers should not need to know a component's styling details only because the component can appear inside them.
