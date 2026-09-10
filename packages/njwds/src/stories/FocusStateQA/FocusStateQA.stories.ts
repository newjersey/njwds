import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { useEffect } from "storybook/internal/preview-api";

import "@newjersey/feedback-widget/feedback-widget.min.js";
import { initFeedbackMocks } from "../components/FeedbackWidget/feedbackApiMock.js";
// @ts-expect-error - no types for uswds subpath
import comboBox from "@uswds/uswds/js/usa-combo-box";
// @ts-expect-error - no types for uswds subpath
import datePicker from "@uswds/uswds/js/usa-date-picker";
// @ts-expect-error - no types for uswds subpath
import dateRangePicker from "@uswds/uswds/js/usa-date-range-picker";
// @ts-expect-error - no types for uswds subpath
import fileInput from "@uswds/uswds/js/usa-file-input";
// @ts-expect-error - no types for uswds subpath
import inPageNav from "@uswds/uswds/js/usa-in-page-navigation";
// @ts-expect-error - no types for uswds subpath
import modal from "@uswds/uswds/js/usa-modal";
// @ts-expect-error - no types for uswds subpath
import table from "@uswds/uswds/js/usa-table";
// @ts-expect-error - no types for uswds subpath
import timePicker from "@uswds/uswds/js/usa-time-picker";
// @ts-expect-error - no types for uswds subpath
import tooltip from "@uswds/uswds/js/usa-tooltip";
// @ts-expect-error - no types for uswds subpath
import characterCount from "@uswds/uswds/js/usa-character-count";
// @ts-expect-error - no types for uswds subpath
import passwordToggle from "@uswds/uswds/js/_usa-password";

import { FocusStateQA, type FocusStateQAProps } from "./FocusStateQA";
import { scopeSectionIds } from "./scopeSectionIds";

const meta = {
  title: "Focus State QA",
  render: (args) => FocusStateQA(args),
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
    showErrorStates: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    (story) => {
      useEffect(() => {
        document
          .querySelectorAll<HTMLElement>("[data-fqa-scope]")
          .forEach((el) => scopeSectionIds(el, el.dataset.fqaScope!));

        initFeedbackMocks(500);

        datePicker.init(document.body); // must precede dateRangePicker
        dateRangePicker.init(document.body);
        comboBox.init(document.body);
        timePicker.init(document.body);
        fileInput.teardown(document.body);
        fileInput.init(document.body);
        characterCount.off(document.body);
        characterCount.on(document.body);
        inPageNav.off(document.body);
        inPageNav.on(document.body);
        table.init(document.body);
        tooltip.init(document.body);
        modal.init(document.body);
        passwordToggle.on();
      }, []);

      return story();
    },
  ],
} satisfies Meta<FocusStateQAProps>;

export default meta;
type Story = StoryObj<FocusStateQAProps>;

export const Default: Story = {
  args: {
    mode: "light",
    showErrorStates: false,
  },
};
