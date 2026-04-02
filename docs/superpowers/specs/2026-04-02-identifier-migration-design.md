# Identifier Component Migration Design

**Date:** 2026-04-02  
**Status:** Approved

## Overview

Migrate the Identifier component from Fractal (`src/components/identifier/`) to Storybook with multiple independent controls for language, logo display, taxpayer disclaimer, and USA.gov section. The component will use external JSON files for translations to keep the implementation clean and maintainable.

## Goals

1. Migrate the Identifier component to Storybook with flexible multi-feature controls
2. Support English and Spanish languages using external translation files
3. Create comprehensive visual regression and accessibility tests
4. Follow established patterns from previously migrated components
5. Maintain visual fidelity to current Fractal templates

## File Structure

```
src/stories/components/Identifier/
  ├── Identifier.ts          # Component implementation
  ├── Identifier.stories.ts  # Storybook configuration
  └── translations/
      ├── en.json           # English translations and content
      └── es.json           # Spanish translations and content

src/tests/identifier/
  ├── visual/
  │   └── identifier.visual.spec.ts      # Playwright visual tests
  └── accessibility/
      └── identifier.accessibility.spec.ts  # Playwright a11y tests
```

## Translation Files (en.json / es.json)

All translatable content will be externalized to JSON files organized by section:

**Structure:**
```json
{
  "masthead": {
    "ariaLabel": "Agency identifier",
    "descriptionLabel": "Agency description",
    "text": "An official website of the",
    "parentName": "the State of New Jersey",
    "taxpayerDisclaimer": "Produced and published at taxpayer expense."
  },
  "requiredLinks": {
    "ariaLabel": "Important links"
  },
  "usagov": {
    "ariaLabel": "U.S. government information and services",
    "description": "Copyright © 2026 State of New Jersey"
  }
}
```

**Usage in component:**
```typescript
import enContent from "./translations/en.json";
import esContent from "./translations/es.json";

const content = language === "Spanish" ? esContent : enContent;
```

**Note:** NJ-specific required links (Governor, Lt. Governor, NJ.gov links, etc.) remain hardcoded in the component as they are not translatable demo content.

## Component Implementation (Identifier.ts)

### Interface

```typescript
export interface IdentifierProps {
  language: "English" | "Spanish";
  logos: "None" | "Single" | "Multiple";
  showTaxpayerDisclaimer: boolean;
  showUsaGov: boolean;
}
```

### Function: Identifier()

**Parameters:**
- `language`: Controls English vs Spanish content
- `logos`: Controls logo display (None/Single NJ logo/Multiple NJ + agency logos)
- `showTaxpayerDisclaimer`: Toggle taxpayer disclaimer in masthead
- `showUsaGov`: Toggle USA.gov section at bottom

**Approach:**
Single function with conditional rendering based on props. Follows the Footer pattern with multiple independent controls.

**Structure:**

1. **Import and select translations:**
   - Import both en.json and es.json
   - Select content based on language prop

2. **Masthead section:**
   - Conditional logo rendering:
     - `None`: No logos div
     - `Single`: NJ state logo only (`./img/nj-logo-gray-20.png`)
     - `Multiple`: NJ state + agency logo (`./img/circle-gray-20.svg`)
   - Identity section with domain (`domain.gov` hardcoded) and disclaimer text
   - Conditional taxpayer disclaimer based on `showTaxpayerDisclaimer` prop
   - ARIA labels from translation file

3. **Required links navigation:**
   - Always rendered
   - Hardcoded NJ-specific links:
     - Governor Mikie Sherrill
     - Lt. Governor Dr. Dale G. Caldwell
     - NJ Home
     - Services A to Z
     - Departments/Agencies
     - FAQs
     - Contact Us
     - Privacy Notice
     - Legal Statement & Disclaimers
     - Accessibility
     - Open Public Records Act (OPRA)
   - ARIA label from translation file

4. **USA.gov section:**
   - Conditionally rendered based on `showUsaGov` prop
   - Content from translation file
   - ARIA label from translation file

**Implementation details:**
- Use Lit's `html` template literal for markup
- Apply USWDS classes exactly as they appear in Fractal templates
- Maintain semantic HTML structure (sections with ARIA labels, nav element)
- All href values use `#!` for demo purposes

## Storybook Configuration (Identifier.stories.ts)

**Meta configuration:**
```typescript
const meta = {
  title: "Components/Identifier",
  tags: ["autodocs"],
  render: (args) => Identifier(args),
  argTypes: {
    language: {
      control: { type: "select" },
      options: ["English", "Spanish"],
    },
    logos: {
      control: { type: "select" },
      options: ["None", "Single", "Multiple"],
    },
    showTaxpayerDisclaimer: {
      control: { type: "boolean" },
    },
    showUsaGov: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<IdentifierProps>;
```

**Story:**
```typescript
export const Default: Story = {
  args: {
    language: "English",
    logos: "Single",
    showTaxpayerDisclaimer: false,
    showUsaGov: true,
  },
};
```

Four independent controls allow users to mix and match features:
- Language: English/Spanish dropdown
- Logos: None/Single/Multiple dropdown
- Show Taxpayer Disclaimer: boolean toggle
- Show USA.gov Section: boolean toggle

Default configuration shows the most common state: English, Single logo, no taxpayer disclaimer, with USA.gov section.

## Testing Strategy

### Visual Regression Tests

**File:** `src/tests/identifier/visual/identifier.visual.spec.ts`

**Test cases:**
1. Default (English, Single logo, no disclaimer, with USA.gov)
2. Spanish language
3. No logos
4. Multiple logos
5. With taxpayer disclaimer
6. Without USA.gov section

These cases cover the key variations without testing every possible combination (which would be 2 × 3 × 2 × 2 = 24 combinations).

**Implementation:**
- Use `runVisualSuite()` utility
- Point to Storybook iframe URLs with args manipulation
- Use default viewports
- Screenshots stored in `src/tests/__screenshots__/`

**Example test cases:**
```typescript
const TEST_CASES = [
  { 
    name: "Default", 
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story` 
  },
  { 
    name: "Spanish", 
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story&args=language:Spanish` 
  },
  { 
    name: "No Logos", 
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story&args=logos:None` 
  },
  { 
    name: "Multiple Logos", 
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story&args=logos:Multiple` 
  },
  { 
    name: "With Taxpayer Disclaimer", 
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story&args=showTaxpayerDisclaimer:true` 
  },
  { 
    name: "Without USA.gov", 
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story&args=showUsaGov:false` 
  },
];
```

### Accessibility Tests

**File:** `src/tests/identifier/accessibility/identifier.accessibility.spec.ts`

**Test cases:**
Same 6 cases as visual tests

**Implementation:**
- Use `runA11ySuite()` utility with axe-core
- Scope scans to `.usa-identifier` element
- Same URL structure as visual tests
- Verify ARIA labels, semantic HTML (nav, sections), landmark regions, and link accessibility

**Example configuration:**
```typescript
runA11ySuite({
  suiteName: "Identifier",
  include: ".usa-identifier",
  cases: TEST_CASES,
});
```

## Implementation Approach

### Conditional Rendering with External Translations (Selected)

**Rationale:**
- Follows the established Footer pattern (single function, conditional rendering)
- External JSON files keep component clean and maintainable
- Independent controls provide maximum flexibility for documentation
- Straightforward conditional logic for each feature
- Language selection is simple (ternary operator on imported JSON)

**Trade-offs:**
- Function will be ~200-250 lines with all sections and conditionals
- More complex than Footer due to multiple independent controls
- But: maintains consistency with established patterns and keeps translations separate

**Alternatives considered:**
1. Section helper functions - rejected as over-abstraction for documentation component
2. Inline translation objects - rejected as it would clutter the component file
3. Single variant dropdown (like Footer) - rejected as it would create 24 variants and lose flexibility

## Success Criteria

1. All feature combinations render correctly in Storybook
2. Visual tests pass for key variations (6 test cases)
3. Accessibility tests pass for all variations (no axe-core violations)
4. Component follows USWDS markup structure exactly
5. Implementation matches patterns from Card/Banner/Footer components
6. Translation files are clean and maintainable
7. Controls work independently (changing one doesn't affect others)

## Out of Scope

- Converting identifier to a web component (not needed per project conventions)
- Adding configurability for NJ-specific required links
- Supporting additional languages beyond English/Spanish
- Making domain, agency names, or other masthead text configurable
- Creating separate stories for each combination
- Fractal template removal (will be handled separately)
