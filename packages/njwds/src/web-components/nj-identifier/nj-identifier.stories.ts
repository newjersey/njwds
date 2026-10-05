import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { expect } from "storybook/test";
import "./nj-identifier";
import type { NjIdentifier } from "./nj-identifier";
import { IDENTIFIER_LANGUAGES, type IdentifierLanguage } from "./nj-identifier.content";
import circleGrayIcon from "../../img/circle-gray-20.svg";

interface IdentifierStoryArgs {
  language: IdentifierLanguage;
  hideLogo: boolean;
  taxpayerDisclaimer: boolean;
}

const meta = {
  title: "Web Components/NJ Identifier",
  tags: ["autodocs"],
  render: (args) => html`
    <nj-identifier
      language=${args.language}
      ?hide-logo=${args.hideLogo}
      ?taxpayer-disclaimer=${args.taxpayerDisclaimer}
    ></nj-identifier>
  `,
  argTypes: {
    language: {
      control: { type: "select" },
      options: IDENTIFIER_LANGUAGES,
    },
    hideLogo: {
      control: { type: "boolean" },
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
    taxpayerDisclaimer: false,
  },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector<NjIdentifier>("nj-identifier");
    await host?.updateComplete;
    const root = host?.shadowRoot;

    expect(root?.querySelector(".usa-identifier")?.getAttribute("lang")).toBe("en");
    expect(root?.querySelectorAll(".usa-identifier__required-links-item")).toHaveLength(11);
    expect(root?.querySelector(".usa-identifier__logo-img")).not.toBeNull();
  },
};

export const Spanish: Story = {
  args: {
    language: "es",
    hideLogo: false,
    taxpayerDisclaimer: false,
  },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector<NjIdentifier>("nj-identifier");
    await host?.updateComplete;
    const root = host?.shadowRoot;

    expect(root?.querySelector(".usa-identifier")?.getAttribute("lang")).toBe("es");
    expect(root?.querySelector(".usa-identifier__identity-disclaimer")?.textContent).toContain(
      "Un sitio web oficial de",
    );
  },
};

export const TaxpayerDisclaimer: Story = {
  args: {
    language: "en",
    hideLogo: false,
    taxpayerDisclaimer: true,
  },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector<NjIdentifier>("nj-identifier");
    await host?.updateComplete;

    expect(
      host?.shadowRoot?.querySelector(".usa-identifier__identity-disclaimer")?.textContent,
    ).toContain("Produced and published at taxpayer expense.");
  },
};

export const NoLogo: Story = {
  args: {
    language: "en",
    hideLogo: true,
    taxpayerDisclaimer: false,
  },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector<NjIdentifier>("nj-identifier");
    await host?.updateComplete;

    expect(host?.shadowRoot?.querySelector(".usa-identifier__logos")).toBeNull();
  },
};

export const MultipleLogos: Story = {
  args: {
    language: "en",
    hideLogo: false,
    taxpayerDisclaimer: false,
  },
  render: (args) => html`
    <nj-identifier
      language=${args.language}
      ?hide-logo=${args.hideLogo}
      ?taxpayer-disclaimer=${args.taxpayerDisclaimer}
      .additionalLogos=${[{ src: circleGrayIcon, href: "#!", alt: "Agency logo" }]}
    ></nj-identifier>
  `,
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector<NjIdentifier>("nj-identifier");
    await host?.updateComplete;

    expect(host?.shadowRoot?.querySelectorAll(".usa-identifier__logo-img")).toHaveLength(2);
  },
};

export const AdditionalLinks: Story = {
  args: {
    language: "en",
    hideLogo: false,
    taxpayerDisclaimer: false,
  },
  render: (args) => html`
    <nj-identifier
      language=${args.language}
      ?hide-logo=${args.hideLogo}
      ?taxpayer-disclaimer=${args.taxpayerDisclaimer}
      .additionalLinks=${[{ href: "#!", label: "Agency-Specific Link", usaLink: true }]}
    ></nj-identifier>
  `,
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector<NjIdentifier>("nj-identifier");
    await host?.updateComplete;

    const links = host?.shadowRoot?.querySelectorAll(".usa-identifier__required-links-item");
    expect(links?.[links.length - 1]?.textContent).toContain("Agency-Specific Link");
  },
};
