import { html } from "lit";

export interface SearchProps {
  size: "Default" | "Big" | "Small";
}

export const Search = ({ size }: SearchProps) => {
  // Class based on size
  const searchClass =
    size === "Big"
      ? "usa-search usa-search--big"
      : size === "Small"
        ? "usa-search usa-search--small"
        : "usa-search";

  // Generate unique input ID based on size
  const inputId =
    size === "Big" ? "search-field-big" : size === "Small" ? "search-field-small" : "search-field";

  // Button content - text for Default/Big, icon for Small
  const buttonContent =
    size === "Small"
      ? html`<img
          src="./img/usa-icons-bg/search--white.svg"
          class="usa-search__submit-icon"
          alt="Search"
        /> `
      : html`<span class="usa-search__submit-text">Search</span>`;

  return html`
    <form class="${searchClass}" role="search">
      <label class="usa-sr-only" for="${inputId}">Search</label>
      <input
        class="usa-input"
        id="${inputId}"
        type="search"
        name="search"
        placeholder="e.g. healthcare services"
      />
      <button class="usa-button" type="submit">${buttonContent}</button>
    </form>
  `;
};
