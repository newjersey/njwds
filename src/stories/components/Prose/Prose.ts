import { html } from "lit";

export interface ProseProps {
  showSpacing: boolean;
}

export const Link = ({ showSpacing }: ProseProps) => {
  const spacingClasses = showSpacing ? "sb-show-spacing bg-primary-lighter" : "";

  return html`
    <div class="usa-prose sb-set-prose-container ${spacingClasses}">
      <h3>Line length</h3>

      <p class="usa-prose">
        <strong>75 characters (68ex) max-width:</strong> Yosemite National Park is set within
        California's Sierra Nevada mountains. It's famed for its giant, ancient sequoias, and for
        Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El
        Capitan and Half Dome.
      </p>

      <h1>Page heading</h1>

      <p class="usa-intro">
        Great Smoky Mountains National Park straddles the border of North Carolina and Tennessee.
      </p>

      <h2>Section heading</h2>

      <h3>Section of the page</h3>

      <p>
        The sprawling landscape encompasses lush forests and an abundance of wildflowers that bloom
        year-round. Streams, rivers and waterfalls appear along hiking routes that include a segment
        of the Appalachian Trail.
      </p>

      <h4>Subsection of the page</h4>

      <p>
        World renowned for its diversity of plant and animal life, the beauty of its ancient
        mountains, and the quality of its remnants of Southern Appalachian mountain culture, this is
        America's most visited national park.
      </p>

      <p>
        Right now scientists think that we only know about 17 percent of the plants and animals that
        live in the park, or about 17,000 species of a probable 100,000 different organisms.
      </p>

      <h5>Subsection of the page</h5>

      <p>
        Entrance to Great Smoky Mountains National Park is free. The park is one of the few national
        parks where no entrance fees are charged.
      </p>

      <ul>
        <li>Unordered list item</li>
        <li>Unordered list item</li>
        <li>
          Unordered list item
          <ul>
            <li>Nested unordered list item</li>
            <li>
              Nested unordered list item
              <ul>
                <li>3rd level nesting</li>
                <li>3rd level nesting</li>
                <li>3rd level nesting</li>
              </ul>
            </li>
            <li>Nested unordered list item</li>
            <li>Nested unordered list item</li>
          </ul>
        </li>
      </ul>

      <p>
        Right now scientists think that we only know about 17 percent of the plants and animals that
        live in the park, or about 17,000 species of a probable 100,000 different organisms.
      </p>

      <ol>
        <li>Ordered list item</li>
        <li>
          Ordered list item
          <ol>
            <li>Nested ordered list item</li>
            <li>Nested ordered list item</li>
            <li>Nested ordered list item</li>
            <li>Nested ordered list item</li>
          </ol>
        </li>
        <li>Ordered list item</li>
      </ol>

      <table>
        <caption>
          Bordered table
        </caption>
        <thead>
          <tr>
            <th scope="col">Document title</th>
            <th scope="col">Description</th>
            <th scope="col">Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Declaration of Independence</th>
            <td>
              Statement adopted by the Continental Congress declaring independence from the British
              Empire.
            </td>
            <td>1776</td>
          </tr>
          <tr>
            <th scope="row">Bill of Rights</th>
            <td>
              The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.
            </td>
            <td>1791</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};
