import commonData from "../../data/common.json";

export interface RequiredLink {
  href: string;
  label: string;
  usaLink?: boolean;
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
  requiredLinks: {
    ariaLabel: string;
  };
  links: RequiredLink[];
  copyright: {
    ariaLabel: string;
    description: string;
  };
}

export interface IdentifierContentOverrides {
  masthead?: Partial<IdentifierContent["masthead"]>;
  requiredLinks?: Partial<IdentifierContent["requiredLinks"]>;
  links?: RequiredLink[];
  copyright?: Partial<IdentifierContent["copyright"]>;
}

const defaultLinks: RequiredLink[] = [
  { href: "https://nj.gov/governor/admin/about/", label: `Governor ${commonData.gov}` },
  { href: "https://nj.gov/governor/admin/lt/", label: `Lt. Governor ${commonData.govlt}` },
  { href: "https://nj.gov/", label: "NJ Home", usaLink: true },
  { href: "https://nj.gov/nj/gov/njgov/alphaserv.html", label: "Services A to Z", usaLink: true },
  { href: "https://nj.gov/nj/gov/deptserv/", label: "Departments/Agencies", usaLink: true },
  { href: "https://nj.gov/faqs/", label: "FAQs", usaLink: true },
  { href: "https://nj.gov/nj/feedback.html", label: "Contact Us", usaLink: true },
  { href: "https://nj.gov/nj/privacy.html", label: "Privacy Notice", usaLink: true },
  {
    href: "https://nj.gov/nj/legal.html",
    label: "Legal Statement & Disclaimers",
    usaLink: true,
  },
  { href: "https://nj.gov/nj/accessibility.html", label: "Accessibility", usaLink: true },
  { href: "https://nj.gov/opra/", label: "Open Public Records Act (OPRA)", usaLink: true },
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
  requiredLinks: {
    ariaLabel: "Important links",
  },
  links: defaultLinks,
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
    requiredLinks: { ...enDefaultContent.requiredLinks, ...overrides.requiredLinks },
    links: overrides.links ?? enDefaultContent.links,
    copyright: { ...enDefaultContent.copyright, ...overrides.copyright },
  };
}
