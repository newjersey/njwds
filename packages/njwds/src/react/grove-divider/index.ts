import * as React from "react";
import { createComponent } from "@lit/react";
import { GroveDivider as Component } from "../../web-components/grove-divider/grove-divider";

const tagName = "grove-divider";

export const GroveDivider = createComponent({
  tagName,
  elementClass: Component,
  react: React,
});
