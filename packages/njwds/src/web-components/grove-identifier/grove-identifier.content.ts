import commonData from "../../data/common.json";

export interface IdentifierLink {
  href: string;
  label: string;
}

export interface IdentifierContent {
  masthead: {
    ariaLabel: string;
    descriptionLabel: string;
    text: string;
    parentName: string;
    parentLogoAlt: string;
    agencyLogoAlt: string;
    taxpayerDisclaimer: string;
  };
  linksSection: {
    ariaLabel: string;
    links: IdentifierLink[];
  };
  copyright: {
    ariaLabel: string;
    description: string;
  };
}

export interface IdentifierContentOverrides {
  masthead?: Partial<IdentifierContent["masthead"]>;
  linksSection?: Partial<IdentifierContent["linksSection"]>;
  copyright?: Partial<IdentifierContent["copyright"]>;
}

export const defaultIdentifierLinks: IdentifierLink[] = [
  { href: "https://nj.gov/governor/admin/about/", label: `Governor ${commonData.gov}` },
  { href: "https://nj.gov/governor/admin/lt/", label: `Lt. Governor ${commonData.govlt}` },
  { href: "https://nj.gov/", label: "NJ Home" },
  { href: "https://nj.gov/nj/gov/njgov/alphaserv.html", label: "Services A to Z" },
  { href: "https://nj.gov/nj/gov/deptserv/", label: "Departments/Agencies" },
  { href: "https://nj.gov/faqs/", label: "FAQs" },
  { href: "https://nj.gov/nj/feedback.html", label: "Contact Us" },
  { href: "https://nj.gov/nj/privacy.html", label: "Privacy Notice" },
  { href: "https://nj.gov/nj/legal.html", label: "Legal Statement & Disclaimers" },
  { href: "https://nj.gov/nj/accessibility.html", label: "Accessibility" },
  { href: "https://nj.gov/opra/", label: "Open Public Records Act (OPRA)" },
];

const enDefaultContent: IdentifierContent = {
  masthead: {
    ariaLabel: "Agency identifier",
    descriptionLabel: "Agency description",
    text: "An official website of the",
    parentName: "the State of New Jersey",
    parentLogoAlt: "the State of New Jersey logo",
    agencyLogoAlt: "agency logo",
    taxpayerDisclaimer: "Produced and published at taxpayer expense.",
  },
  linksSection: {
    ariaLabel: "Important links",
    links: defaultIdentifierLinks,
  },
  copyright: {
    ariaLabel: "U.S. government information and services",
    description: "Copyright © 2026 State of New Jersey",
  },
};

export function resolveIdentifierContent(
  overrides?: IdentifierContentOverrides,
): IdentifierContent {
  if (!overrides) return enDefaultContent;
  return {
    masthead: { ...enDefaultContent.masthead, ...overrides.masthead },
    linksSection: { ...enDefaultContent.linksSection, ...overrides.linksSection },
    copyright: { ...enDefaultContent.copyright, ...overrides.copyright },
  };
}
