import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Signin, type SigninProps } from "./Signin";

const meta = {
  title: "Patterns/Signin",
  tags: ["autodocs"],
  render: (args) => Signin(args),
  argTypes: {},
} satisfies Meta<SigninProps>;

export default meta;
type Story = StoryObj<SigninProps>;

export const Default: Story = {};
