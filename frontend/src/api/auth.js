import axios from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${BACKEND_ORIGIN_URL}/user/register`, {
      name,
      email,
      password,
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

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_ORIGIN_URL}/user/login`, {
      email,
      password,
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

export { registerUser, loginUser };
