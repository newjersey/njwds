import { html } from "lit";

export const Password = () => {
  return html`
    <form class="usa-form">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Reset password</legend>
        <span>Please enter your new password</span>

        <div class="usa-alert usa-alert--info usa-alert--validation">
          <div class="usa-alert__body">
            <h3 class="usa-alert__heading">Password information</h3>
            <p class="usa-alert__text">
              Length requirements
              <br />
              Character constraints, if any
            </p>
          </div>
        </div>

        <label class="usa-label" for="password-reset">New password</label>
        <input class="usa-input" id="password-reset" name="password" type="password" />

        <label class="usa-label" for="confirmPassword">Confirm password</label>
        <input class="usa-input" id="confirmPassword" name="confirmPassword" type="password" />
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
