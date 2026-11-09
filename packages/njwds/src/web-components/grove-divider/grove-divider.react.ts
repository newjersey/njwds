import * as React from "react";
import { createComponent } from "@lit/react";
import { GroveDivider as GroveDividerElement } from "./grove-divider";

// React wrapper, published only through @newjersey/njwds/react. index.ts must never
// import this file, or React would reach every web component consumer.
export const GroveDivider = createComponent({
  tagName: "grove-divider",
  elementClass: GroveDividerElement,
  react: React,
});
