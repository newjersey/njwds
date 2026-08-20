import { html } from "lit";

export interface InPageNavigationProps {
  label: string;
  hideContentInStorybook: boolean;
}

export const InPageNavigation = ({ label, hideContentInStorybook }: InPageNavigationProps) => {
  const hideContentClass = hideContentInStorybook ? "sb-hide-ui" : "";
  const hideAsideClass = hideContentInStorybook ? "margin-0" : "";

  return html` <div class="usa-in-page-nav-container">
    <aside
      class="usa-in-page-nav ${hideAsideClass}"
      data-title-text="${label}"
      data-title-heading-level="h3"
      data-scroll-offset="0"
      data-root-margin="0px 0px 0px 0px"
      data-threshold="1"
    ></aside>

    <main id="main-content" class="main-content usa-prose ${hideContentClass}">
      <h1>(h1) Sample in-page navigation page</h1>
      <h2>(h2) Lorem ipsum dolor</h2>
      <p>Lorem ipsum dolor sit amet</p>
      <h2>(h2) Consec tetuer adipiscing elit</h2>
      <p>Adipiscing onsectetuer elit</p>
      <h3>(h3) Ante ipsum adipiscing</h3>
      <p>Consectetuer elit</p>
      <h3>(h3) Vestibulum ante ipsum primis</h3>
      <p>Elit onsectetuer adipiscing</p>
      <h3>(h3) Vestibulum ante ipsum primis</h3>
      <p>Sdipiscing adipiscing elit</p>
      <h2>(h2) Consectetuer adipiscing elit</h2>
      <p>Consectetuer adipiscing elit</p>
    </main>
  </div>`;
};
