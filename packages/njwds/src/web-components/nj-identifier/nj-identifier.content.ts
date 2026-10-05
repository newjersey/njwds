import commonData from "../../data/common.json";

export const IDENTIFIER_LANGUAGES = ["en", "es"] as const;
export type IdentifierLanguage = (typeof IDENTIFIER_LANGUAGES)[number];

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
  copyright: {
    ariaLabel: string;
    description: string;
  };
}

const en: IdentifierContent = {
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
  copyright: {
    ariaLabel: "U.S. government information and services",
    description: "Copyright © 2026 State of New Jersey",
  },
};

const es: IdentifierContent = {
  masthead: {
    ariaLabel: "Identificador de la agencia",
    descriptionLabel: "Descripción de la agencia",
    text: "Un sitio web oficial de",
    parentName: "el Estado de Nueva Jersey",
    parentLogoAlt: "Logo de la el Estado de Nueva Jersey",
    agencyLogoAlt: "Logo de la agencia",
    taxpayerDisclaimer: "Producido y publicado con dinero de los contribuyentes de impuestos.",
  },
  requiredLinks: {
    ariaLabel: "Enlaces importantes",
  },
  copyright: {
    ariaLabel: "Información y servicios del Gobierno de EE. UU.",
    description: "¿Necesita información y servicios del Gobierno?",
  },
};

const contentByLanguage: Record<IdentifierLanguage, IdentifierContent> = { en, es };

export function getIdentifierContent(language: IdentifierLanguage): IdentifierContent {
  return contentByLanguage[language] ?? en;
}

export interface RequiredLink {
  href: string;
  label: string;
  usaLink?: boolean;
}

export function getRequiredLinks(): RequiredLink[] {
  return [
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
}
