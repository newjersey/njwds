import * as React from "react";
import { createComponent } from "@lit/react";
import { GroveDivider as Component } from "../../web-components/grove-divider";

export const GroveDivider = createComponent({
  tagName: "grove-divider",
  elementClass: Component,
  react: React,
});
