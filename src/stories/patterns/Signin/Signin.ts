import { html } from "lit";
export interface SigninProps {
  error: boolean;
  required: boolean;
  helperText: boolean;
}

export const Signin = ({ error, required, helperText }: SigninProps) => {
  const errorFormClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "usa-input--error" : "";
  const errorLabelClass = error ? "usa-label--error margin-top-3" : "";

  const errorMessage = (errorId: string, message: string) => html`
    <div class="nj-error-message-container">
      <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
        <use xlink:href="./img/sprite.svg#error"></use>
      </svg>
      <span class="usa-error-message" id="${errorId}" role="alert">${message}</span>
    </div>
  `;

  return html`
    <form class="usa-form ${errorFormClass}">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend font-heading-xl text-bold">Sign in</legend>
        <span>or <a href="#!">create an account</a></span>

        <label class="usa-label ${errorLabelClass}" for="username">
          Username or email address
          ${required ? html`<abbr title="required" class="usa-label--required">*</abbr>` : ""}
        </label>
        ${helperText ? html`<div id="hint-0" class="usa-hint">Helper text</div>` : ""}
        <input
          class="usa-input ${errorInputClass}"
          aria-describedby="${helperText ? "hint-0" : undefined} ${error
            ? "input-error-0"
            : undefined}"
          id="username"
          name="username"
          type="text"
          autocapitalize="off"
          autocorrect="off"
        />

        ${error ? errorMessage("input-error-0", "Helpful error message") : ""}

        <label class="usa-label ${errorLabelClass}" for="password-sign-in">
          Password
          ${required ? html`<abbr title="required" class="usa-label--required">*</abbr>` : ""}
        </label>
        ${helperText ? html`<div id="hint-1" class="usa-hint">Helper text</div>` : ""}
        <input
          class="usa-input ${errorInputClass}"
          aria-describedby="${helperText ? "hint-1" : undefined} ${error
            ? "input-error-1"
            : undefined}"
          id="password-sign-in"
          name="password"
          type="password"
        />

        ${error ? errorMessage("input-error-1", "Helpful error message") : ""}

        <p class="usa-form__note">
          <button
            type="button"
            class="margin-top-0 usa-button usa-button--unstyled usa-show-password"
            aria-controls="password-sign-in"
          >
            Show password
          </button>
        </p>

        <button class="usa-button" type="submit">Sign in</button>

        <p><a href="#!" title="Forgot username">Forgot username?</a></p>
        <p><a href="#!" title="Forgot password">Forgot password?</a></p>
      </fieldset>
    </form>
  `;
};
