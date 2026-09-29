import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { DocumentationLayout } from "./Documentation";
import "@uswds/uswds";

const meta = {
  title: "Templates/Documentation",
  tags: ["autodocs"],
  render: () => DocumentationLayout(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
