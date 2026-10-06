import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../../web-components/nj-identifier/nj-identifier";
import {
  IDENTIFIER_LANGUAGES,
  type IdentifierLanguage,
} from "../../../web-components/nj-identifier/nj-identifier.content";
import circleGrayIcon from "../../../img/circle-gray-20.svg";

type AdditionalLogosOption = "none" | "agency-logo";

interface IdentifierStoryArgs {
  language: IdentifierLanguage;
  hideLogo: boolean;
  additionalLogos: AdditionalLogosOption;
  taxpayerDisclaimer: boolean;
}

const ADDITIONAL_LOGOS_OPTIONS: Record<
  AdditionalLogosOption,
  { src: string; href: string; alt: string }[]
> = {
  none: [],
  "agency-logo": [{ src: circleGrayIcon, href: "#!", alt: "Agency logo" }],
};

const ADDITIONAL_LOGOS_SAMPLE: Record<
  AdditionalLogosOption,
  { src: string; href: string; alt: string }[]
> = {
  none: [],
  "agency-logo": [{ src: "/path/to/agency-logo.svg", href: "#!", alt: "Agency logo" }],
};

const meta = {
  title: "Components/Identifier (Web Component)",
  tags: ["autodocs"],
  render: (args) => html`
    <nj-identifier
      language=${args.language}
      ?hide-logo=${args.hideLogo}
      ?taxpayer-disclaimer=${args.taxpayerDisclaimer}
      .additionalLogos=${ADDITIONAL_LOGOS_OPTIONS[args.additionalLogos]}
    ></nj-identifier>
  `,
  parameters: {
    docs: {
      source: {
        transform: (_code: string, { args }: { args: IdentifierStoryArgs }) => {
          const attrs = [
            `language="${args.language}"`,
            args.hideLogo && "hide-logo",
            args.taxpayerDisclaimer && "taxpayer-disclaimer",
            args.additionalLogos === "agency-logo" &&
              !args.hideLogo &&
              `additional-logos='${JSON.stringify(ADDITIONAL_LOGOS_SAMPLE[args.additionalLogos])}'`,
          ]
            .filter(Boolean)
            .join(" ");

          return `<nj-identifier ${attrs}></nj-identifier>`;
        },
      },
    },
  },
  argTypes: {
    language: {
      control: { type: "select" },
      options: IDENTIFIER_LANGUAGES,
    },
    hideLogo: {
      control: { type: "boolean" },
    },
    additionalLogos: {
      control: { type: "select" },
      options: ["none", "agency-logo"],
      if: { arg: "hideLogo", eq: false },
    },
    taxpayerDisclaimer: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<IdentifierStoryArgs>;

export default meta;
type Story = StoryObj<IdentifierStoryArgs>;

export const Default: Story = {
  args: {
    language: "en",
    hideLogo: false,
    additionalLogos: "none",
    taxpayerDisclaimer: false,
  },
};

export const Spanish: Story = {
  args: {
    language: "es",
    hideLogo: false,
    additionalLogos: "none",
    taxpayerDisclaimer: false,
  },
};

export const Disclaimer: Story = {
  args: {
    language: "en",
    hideLogo: false,
    additionalLogos: "none",
    taxpayerDisclaimer: true,
  },
};

export const MultipleLogos: Story = {
  args: {
    language: "en",
    hideLogo: false,
    additionalLogos: "agency-logo",
    taxpayerDisclaimer: false,
  },
};
