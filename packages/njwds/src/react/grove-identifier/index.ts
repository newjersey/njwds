import * as React from "react";
import { createComponent } from "@lit/react";
import { GroveIdentifier as Component } from "../../web-components/grove-identifier";

export const GroveIdentifier = createComponent({
  tagName: "grove-identifier",
  elementClass: Component,
  react: React,
});
