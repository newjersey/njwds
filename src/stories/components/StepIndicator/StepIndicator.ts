import { html } from "lit";

export interface StepIndicatorComponentProps {
  label: string;
  title: string;
  noLabels: boolean;
  centered: boolean;
  counters: boolean;
  smallCounters: boolean;
}

export const StepIndicatorComponent = ({
  label,
  title,
  noLabels,
  centered,
  counters,
  smallCounters,
}: StepIndicatorComponentProps) => {
  const stepIndicatorClass = noLabels ? "usa-sr-only" : "usa-step-indicator__segment-label";
  const stepIndicatorClassCentered = centered ? "text-center padding-0" : "";

  return html`
    <div class="usa-step-indicator" aria-label="progress">
      <ol class="usa-step-indicator__segments">
        <li class="usa-step-indicator__segment usa-step-indicator__segment--complete">
          <span class="${stepIndicatorClass} ${stepIndicatorClassCentered}"
            >${label} <span class="usa-sr-only">completed</span></span
          >
        </li>
        <li class="usa-step-indicator__segment usa-step-indicator__segment--complete">
          <span class="${stepIndicatorClass} ${stepIndicatorClassCentered}"
            >${label} <span class="usa-sr-only">completed</span></span
          >
        </li>
        <li
          class="usa-step-indicator__segment usa-step-indicator__segment--current"
          aria-current="true"
        >
          <span class="${stepIndicatorClass} ${stepIndicatorClassCentered}">${label} </span>
        </li>
        <li class="usa-step-indicator__segment">
          <span class="${stepIndicatorClass} ${stepIndicatorClassCentered}"
            >${label} <span class="usa-sr-only">not completed</span></span
          >
        </li>
        <li class="usa-step-indicator__segment">
          <span class="${stepIndicatorClass} ${stepIndicatorClassCentered}"
            >${label} <span class="usa-sr-only">not completed</span></span
          >
        </li>
      </ol>
      <div class="usa-step-indicator__header">
        <h2 class="usa-step-indicator__heading">
          <span class="usa-step-indicator__heading-counter">
            <span class="usa-sr-only">Step</span>
            <span class="usa-step-indicator__current-step">3</span>
            <span class="usa-step-indicator__total-steps">of 5</span>
          </span>
          <span class="usa-step-indicator__heading-text">${title}</span>
        </h2>
      </div>
    </div>
  `;
};
