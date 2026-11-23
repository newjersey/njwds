import * as React from "react";
import { createComponent } from "@lit/react";
import { Grove{{Name}} as Grove{{Name}}Element } from "./grove-{{name}}.js";

// React wrapper, published only through @newjersey/njwds/react. index.ts must never
// import this file, or React would reach every web component consumer.
export const Grove{{Name}} = createComponent({
  tagName: "grove-{{name}}",
  elementClass: Grove{{Name}}Element,
  react: React,
});
