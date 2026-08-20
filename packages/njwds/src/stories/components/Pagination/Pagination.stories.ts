import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { PaginationComponent, type PaginationComponentProps } from "./Pagination";

const meta = {
  title: "Components/Pagination",
  tags: ["autodocs"],
  render: (args) => PaginationComponent(args),
} satisfies Meta<PaginationComponentProps>;

export default meta;
type Story = StoryObj<PaginationComponentProps>;

export const Default: Story = {
  args: {
    unbounded: false,
  },
};
