import { html } from "lit";

type borderType = boolean;

export interface TableProps {
  border?: borderType;
}

export const Table = ({ border = true }: TableProps) => {
  const hasBorder = border !== true ? "usa-table--borderless" : "";

  return html`
    <table class="usa-table ${hasBorder}">
      <caption>
        Table caption
      </caption>
      <thead>
        <tr>
          <th scope="col">Column heading</th>
          <th scope="col">Column heading</th>
          <th scope="col">Column heading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Row heading</th>
          <td>Table data</td>
          <td>Table data</td>
        </tr>
        <tr>
          <th scope="row">Row heading</th>
          <td>Table data</td>
          <td>Table data</td>
        </tr>
      </tbody>
    </table>
  `;
};
