import axios from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

const getOneQuiz = async (quizId) => {
  try {
    const response = await axios.get(
      `${BACKEND_ORIGIN_URL}/quiz/get-one/${quizId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

const getAllQuiz = async () => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/quiz/get-all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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

const createQuiz = async (quizName, quizType, quizQuestions) => {
  try {
    const response = await axios.post(
      `${BACKEND_ORIGIN_URL}/quiz/create`,
      {
        quizName,
        quizType,
        quizQuestions,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

const updateQuiz = async (quizId, quizQuestions) => {
  try {
    const response = await axios.put(
      `${BACKEND_ORIGIN_URL}/quiz/update/${quizId}`,
      {
        quizQuestions,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

const deleteQuiz = async (quizId) => {
  try {
    const response = await axios.delete(
      `${BACKEND_ORIGIN_URL}/quiz/delete/${quizId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

export { getOneQuiz, createQuiz, updateQuiz, getAllQuiz, deleteQuiz };
