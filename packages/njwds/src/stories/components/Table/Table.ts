import { html, nothing } from "lit";

export interface TableProps {
  border: boolean;
  compact: boolean;
  responsiveStack: boolean;
  scrollable: boolean;
  sortable: boolean;
  stickyHeaders: boolean;
  striped: boolean;
}

const LONG_CELL_CONTENT =
  "Vestibulum tristique, dui ut facilisis mattis, sem elit egestas magna, pretium accumsan sapien urna et nulla.";
const SHORT_CELL_CONTENT = "Habitasse platea";

export const Table = ({
  border,
  compact,
  responsiveStack,
  scrollable,
  sortable,
  stickyHeaders,
  striped,
}: TableProps) => {
  const isBorderless = border === false ? "usa-table--borderless" : "";
  const isCompact = compact === true ? "usa-table--compact" : "";
  const isStriped = striped === true ? "usa-table--striped" : "";
  const isSticky = stickyHeaders === true ? "usa-table--sticky-header" : "";
  const isResponsive = responsiveStack === true ? "usa-table--stacked" : "";

  const tableCellContent = scrollable === true ? LONG_CELL_CONTENT : SHORT_CELL_CONTENT;

  const stickyHeaderHtml = html`
    <tr>
      <th scope="row">Lacinia imperdiet</th>
      <td data-sort-value=${sortable ? tableCellContent : nothing}>${tableCellContent}</td>
      <td data-sort-value=${sortable ? "Platea habitasse" : nothing}>Grack habitasse</td>
      <td data-sort-value=${sortable ? "Gabitasse platea" : nothing}>Gabitasse platea</td>
    </tr>
  `;

  const liveRegion = sortable
    ? html`<div class="usa-sr-only usa-table__announcement-region" aria-live="polite"></div>`
    : "";

  const baseTableHtml = html`
    <table class="usa-table ${isBorderless} ${isCompact} ${isStriped} ${isSticky} ${isResponsive}">
      <caption>
        ${sortable ? "Sortable table caption" : "Table caption"}
      </caption>
      <thead>
        <tr>
          <th scope="col" ?data-sortable=${sortable} role="${sortable ? "columnheader" : nothing}">
            Maecenas tempor
          </th>
          <th scope="col" ?data-sortable=${sortable} role="${sortable ? "columnheader" : nothing}">
            Condimentum sodales
          </th>
          <th scope="col" ?data-sortable=${sortable} role="${sortable ? "columnheader" : nothing}">
            Tortor nec eros
          </th>
          <th scope="col" ?data-sortable=${sortable} role="${sortable ? "columnheader" : nothing}">
            Nec eros tortor
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Pellen tesque fermentum</th>
          <td data-sort-value=${sortable ? tableCellContent : nothing}>${tableCellContent}</td>
          <td data-sort-value=${sortable ? "Tabitasse platea" : nothing}>Tabitasse platea</td>
          <td data-sort-value=${sortable ? "Zid tasse platea" : nothing}>Habi tasse platea</td>
        </tr>
        <tr>
          <th scope="row">Lacinia imperdiet</th>
          <td data-sort-value=${sortable ? tableCellContent : nothing}>${tableCellContent}</td>
          <td data-sort-value=${sortable ? "Papa habitasse" : nothing}>Papa habitasse</td>
          <td data-sort-value=${sortable ? "Hagnis bitasse platea" : nothing}>
            Hagnis bitasse platea
          </td>
        </tr>
        <tr>
          <th scope="row">Imperdiet lacinia</th>
          <td data-sort-value=${sortable ? tableCellContent : nothing}>${tableCellContent}</td>
          <td data-sort-value=${sortable ? "Sum habitasse" : nothing}>Sum habitasse</td>
          <td data-sort-value=${sortable ? "Incid tasse pl atea" : nothing}>Incid tasse pl atea</td>
        </tr>
        <tr>
          <th scope="row">Imperdiet lacinia</th>
          <td data-sort-value=${sortable ? tableCellContent : nothing}>${tableCellContent}</td>
          <td data-sort-value=${sortable ? "Lipsum hab itasse" : nothing}>Lipsum hab itasse</td>
          <td data-sort-value=${sortable ? "Dolor tasse platea" : nothing}>Dolor tasse platea</td>
        </tr>
        ${stickyHeaders ? Array(6).fill(stickyHeaderHtml) : ""}
      </tbody>
    </table>
    ${liveRegion}
  `;

  const tableHtmlOutput =
    scrollable === true
      ? html`
          <div
            class="usa-table-container--scrollable"
            tabindex="0"
            aria-label="Describe your table here"
          >
            ${baseTableHtml}
          </div>
        `
      : baseTableHtml;

  return tableHtmlOutput;
};
