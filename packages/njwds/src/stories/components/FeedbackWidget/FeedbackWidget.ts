import { html } from "lit";

export const FeedbackWidget = () => {
  return html`
    <feedback-widget
      skipEmailStep="false"
      contact-link="https://www.example.com/contact"
      showCommentDisclaimer="true"
      onlySaveRatingToAnalytics="false"
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
