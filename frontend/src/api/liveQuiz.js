import axios from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

const getSingleQuiz = async (quizId) => {
  try {
    const response = await axios.get(
      `${BACKEND_ORIGIN_URL}/live/get-quiz/${quizId}`
    );

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || "An error occurred",
      status: error.response?.status || 500,
    };
  }
};

const updateAnalytic = async (
  quizId,
  questionNo,
  peopleAttempted,
  answeredCorrectly,
  answeredIncorrectly,
  optionChoosed
) => {
  try {
    const response = await axios.put(
      `${BACKEND_ORIGIN_URL}/live/update-analytic/${quizId}`,
      {
        questionNo,
        peopleAttempted,
        answeredCorrectly,
        answeredIncorrectly,
        optionChoosed,
      }
    );

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || "An error occurred",
      status: error.response?.status || 500,
    };
  }
};

export { getSingleQuiz, updateAnalytic };
