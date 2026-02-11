import { html } from "lit";

export interface BannerProps {
  governor: string;
  ltgovernor: string;
}

export const BannerComponent = ({ governor, ltgovernor }: BannerProps) => {
  return html`
    <section class="nj-banner" aria-label="Official government website">
      <div class="nj-banner__header">
        <div class="grid-container">
          <div class="nj-banner__inner">
            <div class="grid-col-auto">
              <img
                class="nj-banner__header-seal"
                src="./img/nj_state_seal.png"
                alt="New Jersey State Seal"
              />
            </div>
            <div class="grid-col-fill">
              <a href="https://nj.gov" rel="noopener">Official Site of the State of New Jersey</a>
            </div>
            <ul class="grid-col-auto display-flex flex-align-center">
              <li>
                <a href="https://nj.gov/governor/" rel="noopener">
                  Governor ${governor} &bull; Lt. Governor ${ltgovernor}
                </a>
              </li>
              <li class="grid-col-auto">
                <a
                  class="display-flex flex-align-center"
                  href="https://nj.gov/subscribe/"
                  rel="noopener"
                >
                  <svg
                    class="usa-icon usa-icon--size-3 nj-banner__mail-icon margin-right-05"
                    role="img"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use xlink:href="./img/sprite.svg#mail" />
                  </svg>
                  Get Updates
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
};
