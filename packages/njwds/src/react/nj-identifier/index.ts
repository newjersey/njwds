import * as React from "react";
import { createComponent } from "@lit/react";
import { NjIdentifier as Component } from "../../web-components/nj-identifier/nj-identifier";

const tagName = "nj-identifier";

export const NjIdentifier = createComponent({
  tagName,
  elementClass: Component,
  react: React,
});
