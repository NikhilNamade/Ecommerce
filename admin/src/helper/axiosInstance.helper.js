import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ecommerce-q4cf.onrender.com",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Normalize success response
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Bad Request:", data);
          break;
        case 401:
          console.error("Unauthorized:", data);
          break;
        case 403:
          console.error("Forbidden:", data);
          break;
        case 404:
          console.error("Not Found:", data);
          break;
        case 500:
          console.error("Server Error:", data);
          break;
        default:
          console.error(`Error ${status}:`, data);
      }

      return Promise.reject({
        success: false,
        status,
        message: data?.message || "Request failed",
      });
    }

    if (error.request) {
      console.error("Network Error:", error.message);
      return Promise.reject({
        success: false,
        message: "Network Error",
      });
    }

    return Promise.reject({
      success: false,
      message: "Unexpected Error",
    });
  }
);
