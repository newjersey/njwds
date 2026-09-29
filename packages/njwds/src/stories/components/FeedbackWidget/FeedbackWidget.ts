import { html } from "lit";

export const FeedbackWidget = () => {
  return html`
    <feedback-widget
      skip-email-step="false"
      contact-link="https://www.example.com/contact"
      show-comment-disclaimer="true"
      only-save-rating-to-analytics="false"
    >
    </feedback-widget>

    <p>
      View
      <a href="https://github.com/newjersey/feedback-widget/blob/main/README.md">
        official Feedback Widget documentation
      </a>
    </p>
  `;
};
