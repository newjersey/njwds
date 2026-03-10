import { html } from "lit";

export const Signin = () => {
  return html`
    <form class="usa-form">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Sign in</legend>
        <span>or <a href="#!">create an account</a></span>

        <label class="usa-label" for="username">Username or email address</label>
        <input
          class="usa-input"
          id="username"
          name="username"
          type="text"
          autocapitalize="off"
          autocorrect="off"
        />

        <label class="usa-label" for="password-sign-in">Password</label>
        <input class="usa-input" id="password-sign-in" name="password" type="password" />
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
