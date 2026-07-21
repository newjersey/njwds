import { html } from "lit";

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
  console.log(sortable);
  const tableCellContent = scrollable === true ? LONG_CELL_CONTENT : SHORT_CELL_CONTENT;

  const stickyHeaderHtml = html`
    <tr>
      <th scope="row">Lacinia imperdiet</th>
      <td>${tableCellContent}</td>
      <td>Platea habitasse</td>
      <td>Habitasse platea</td>
    </tr>
  `;

  const baseTableHtml = html`
    <table class="usa-table ${isBorderless} ${isCompact} ${isStriped} ${isSticky} ${isResponsive}">
      <caption>
        Table caption
      </caption>
      <thead>
        <tr>
          <th scope="col">Maecenas tempor</th>
          <th scope="col">Condimentum sodales</th>
          <th scope="col">Tortor nec eros</th>
          <th scope="col">Nec eros tortor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Pellen tesque fermentum</th>
          <td>${tableCellContent}</td>
          <td>Habitasse platea</td>
          <td>Habi tasse platea</td>
        </tr>
        <tr>
          <th scope="row">Lacinia imperdiet</th>
          <td>${tableCellContent}</td>
          <td>Platea habitasse</td>
          <td>Ha bitasse platea</td>
        </tr>
        <tr>
          <th scope="row">Imperdiet lacinia</th>
          <td>${tableCellContent}</td>
          <td>Lipsum habitasse</td>
          <td>Habi tasse pl atea</td>
        </tr>
        <tr>
          <th scope="row">Imperdiet lacinia</th>
          <td>${tableCellContent}</td>
          <td>Lipsum hab itasse</td>
          <td>Habi tasse platea</td>
        </tr>
        ${stickyHeaders ? Array(6).fill(stickyHeaderHtml) : ""}
      </tbody>
    </table>
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
      : html`${baseTableHtml}`;

  return tableHtmlOutput;
};
