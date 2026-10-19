import * as React from "react";
import { createComponent } from "@lit/react";
import { NjDivider as Component } from "../../web-components/nj-divider/nj-divider";

const tagName = "nj-divider";

export const NjDivider = createComponent({
  tagName,
  elementClass: Component,
  react: React,
});
