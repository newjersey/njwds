import { html } from "lit";
import { renderErrorMessage } from "../../../utils/errorMessage";
import { renderRequired } from "../../../utils/requiredIndicator";

export interface PasswordProps {
  error: boolean;
  required: boolean;
  helperText: boolean;
}

export const Password = ({ error, required, helperText }: PasswordProps) => {
  const errorFormClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "usa-input--error" : "";
  const errorLabelClass = error ? "usa-label--error margin-top-3" : "";

  return html`
    <form class="usa-form usa-form--large ${errorFormClass}">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend font-heading-xl text-bold">Reset password</legend>
        <span>Please enter your new password</span>

        <div class="usa-alert usa-alert--info usa-alert--validation">
          <div class="usa-alert__body">
            <h3 class="usa-alert__heading">Password information</h3>
            <p class="usa-alert__text">Length requirements and character constraints, if any.</p>
          </div>
        </div>

        <label class="usa-label ${errorLabelClass}" for="password-reset">
          New password ${renderRequired(required)}
        </label>
        ${helperText ? html`<div id="hint-0" class="usa-hint">Helper text</div>` : ""}
        <input
          aria-describedby="${helperText ? "hint-0" : undefined} ${error
            ? "input-error-0"
            : undefined}"
          class="usa-input ${errorInputClass}"
          id="password-reset"
          name="password"
          type="password"
        />
        ${error ? renderErrorMessage("input-error-0", "Helpful error message") : ""}

        <label class="usa-label ${errorLabelClass}" for="confirmPassword">
          Confirm password ${renderRequired(required)}
        </label>
        ${helperText ? html`<div id="hint-1" class="usa-hint">Helper text</div>` : ""}
        <input
          aria-describedby="${helperText ? "hint-1" : undefined} ${error
            ? "input-error-1"
            : undefined}"
          class="usa-input ${errorInputClass}"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
        />

        ${error ? renderErrorMessage("input-error-1", "Helpful error message") : ""}

        <p class="usa-form__note">
          <button
            type="button"
            class="margin-top-0 usa-button usa-button--unstyled usa-show-password"
            aria-controls="password-reset confirmPassword"
          >
            Show password
          </button>
        </p>

        <button class="usa-button" type="submit">Reset password</button>
      </fieldset>
    </form>
  `;
};
