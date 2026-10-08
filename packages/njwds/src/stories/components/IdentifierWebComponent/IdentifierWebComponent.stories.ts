import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../../web-components/nj-identifier/nj-identifier";
import { defaultIdentifierLinks } from "../../../web-components/nj-identifier/nj-identifier.content";
import type { IdentifierContentOverrides } from "../../../web-components/nj-identifier/nj-identifier.content";
import circleGrayIcon from "../../../img/circle-gray-20.svg";

type AdditionalLogosOption = "none" | "agency-logo";

interface IdentifierStoryArgs {
  language: string;
  content?: IdentifierContentOverrides;
  hideLogo: boolean;
  additionalLogos: AdditionalLogosOption;
  taxpayerDisclaimer: boolean;
}

const CUSTOM_LINKS = defaultIdentifierLinks
  .filter((link) => link.href !== "https://nj.gov/faqs/" && link.href !== "https://nj.gov/opra/")
  .map((link) =>
    link.href === "https://nj.gov/nj/feedback.html" ? { ...link, label: "Get in Touch" } : link,
  )
  .concat({ href: "https://example.com/about", label: "About the Agency" });

const SPANISH_CONTENT: IdentifierContentOverrides = {
  masthead: {
    ariaLabel: "Identificador de la agencia",
    descriptionLabel: "Descripción de la agencia",
    text: "Un sitio web oficial de",
    parentName: "el Estado de Nueva Jersey",
    parentLogoAlt: "Logo de la el Estado de Nueva Jersey",
    agencyLogoAlt: "Logo de la agencia",
    taxpayerDisclaimer: "Producido y publicado con dinero de los contribuyentes de impuestos.",
  },
  linksSection: {
    ariaLabel: "Enlaces importantes",
  },
  copyright: {
    ariaLabel: "Información y servicios del Gobierno de EE. UU.",
    description: "¿Necesita información y servicios del Gobierno?",
  },
};

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
      .content=${args.content}
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
            args.content && `content='${JSON.stringify(args.content)}'`,
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
      control: { type: "text" },
    },
    content: {
      control: false,
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
    content: SPANISH_CONTENT,
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

export const CustomLinks: Story = {
  args: {
    language: "en",
    content: { linksSection: { links: CUSTOM_LINKS } },
    hideLogo: false,
    additionalLogos: "none",
    taxpayerDisclaimer: false,
  },
};
