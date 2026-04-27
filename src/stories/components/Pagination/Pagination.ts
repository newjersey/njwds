import { html } from "lit";

export interface PaginationComponentProps {
  unbounded: boolean;
}

export const PaginationComponent = ({ unbounded }: PaginationComponentProps) => {
  const unboundedHtml = unbounded
    ? html`
        <li class="usa-pagination__item usa-pagination__page-no">
          <a href="#!" class="usa-pagination__button" aria-label="Page 12">12</a>
        </li>
        <li
          class="usa-pagination__item usa-pagination__overflow"
          aria-label="ellipsis indicating non-visible pages"
        >
          <span>&hellip;</span>
        </li>
      `
    : html`
        <li
          class="usa-pagination__item usa-pagination__overflow"
          aria-label="ellipsis indicating non-visible pages"
        >
          <span>&hellip;</span>
        </li>
        <li class="usa-pagination__item usa-pagination__page-no">
          <a href="#!" class="usa-pagination__button" aria-label="Last page, page 24">24</a>
        </li>
      `;

  return html`
    <nav aria-label="Pagination" class="usa-pagination">
      <ul class="usa-pagination__list">
        <li class="usa-pagination__item usa-pagination__arrow">
          <a
            href="#!"
            class="usa-pagination__link usa-pagination__previous-page"
            aria-label="Previous page"
          >
            <svg class="usa-icon" aria-hidden="true" role="img">
              <use href="./img/sprite.svg#navigate_before"></use>
            </svg>
            <span class="usa-pagination__link-text">Previous</span></a
          >
        </li>
        <li class="usa-pagination__item usa-pagination__page-no">
          <a href="#!" class="usa-pagination__button" aria-label="Page 1">1</a>
        </li>
        <li
          class="usa-pagination__item usa-pagination__overflow"
          aria-label="ellipsis indicating non-visible pages"
        >
          <span>&hellip;</span>
        </li>
        <li class="usa-pagination__item usa-pagination__page-no">
          <a href="#!" class="usa-pagination__button" aria-label="Page 9">9</a>
        </li>
        <li class="usa-pagination__item usa-pagination__page-no">
          <a
            href="#!"
            class="usa-pagination__button usa-current"
            aria-label="Page 10"
            aria-current="page"
            >10</a
          >
        </li>
        <li class="usa-pagination__item usa-pagination__page-no">
          <a href="#!" class="usa-pagination__button" aria-label="Page 11">11</a>
        </li>
        ${unboundedHtml}
        <li class="usa-pagination__item usa-pagination__arrow">
          <a
            href="#!"
            class="usa-pagination__link usa-pagination__next-page"
            aria-label="Next page"
          >
            <span class="usa-pagination__link-text">Next</span>
            <svg class="usa-icon" aria-hidden="true" role="img">
              <use href="./img/sprite.svg#navigate_next"></use>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  `;
};
