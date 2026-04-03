import { initMockFetch } from "../../../utils/mockFetch";

export const FEEDBACK_API_URL = "https://innovation.nj.gov/app/feedback/dev";

export const MOCK_SUCCESS_RESPONSE = {
  status: 200,
  body: {
    message: "Success",
    feedbackId: 1,
  },
};

export const initFeedbackMocks = (delay = 1000) => {
  initMockFetch(
    {
      [`${FEEDBACK_API_URL}/rating`]: MOCK_SUCCESS_RESPONSE,
      [`${FEEDBACK_API_URL}/comment`]: MOCK_SUCCESS_RESPONSE,
      [`${FEEDBACK_API_URL}/email`]: MOCK_SUCCESS_RESPONSE,
    },
    delay,
  );
};
