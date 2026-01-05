# General decisions

## Naming Conventions

Web components should be prefixed with `nj-` (e.g. `<nj-accordion />`)

## Base HTML Elements

Base HTML elements should not be converted to Web components if new functionality isn't being added. In general, base HTML elements should be [customized](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#customized_built-in_elements). If you are just using the element itself with nothing added, lean on regular classes instead of a full component.
