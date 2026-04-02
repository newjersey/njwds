import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { LandingLayout } from "./Landing";
import "@uswds/uswds";

const meta = {
  title: "Templates/Landing",
  tags: ["autodocs"],
  render: () => LandingLayout(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
