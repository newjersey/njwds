import { html } from "lit";

export interface BreadcrumbProps {
  wrap: boolean;
}

export const Breadcrumb = ({ wrap }: BreadcrumbProps) => {
  const wrapClass = wrap ? "usa-breadcrumb--wrap" : "";

  return html`
    <nav class="usa-breadcrumb ${wrapClass}" aria-label="Breadcrumbs">
      <ol class="usa-breadcrumb__list">
        <li class="usa-breadcrumb__list-item">
          <a href="#" class="usa-breadcrumb__link">
            <span>Home</span>
          </a>
        </li>
        <li class="usa-breadcrumb__list-item">
          <a href="#" class="usa-breadcrumb__link">
            <span>Federal Contracting</span>
          </a>
        </li>
        <li class="usa-breadcrumb__list-item">
          <a href="#" class="usa-breadcrumb__link">
            <span>Contracting assistance programs</span>
          </a>
        </li>
        <li class="usa-breadcrumb__list-item usa-current" aria-current="page">
          <span>Women-owned small business federal contracting program</span>
        </li>
      </ol>
    </nav>
  `;
};
