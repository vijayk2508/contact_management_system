import axios from "axios";

const ServiceAPI = {
  axiosInstance: axios.create({
    baseURL: "https://contact-management-system-5aky.onrender.com", //"http://localhost:8080",
    timeout: 10000, // Adjust timeout as per your requirement
  }),

  // Function to make a request with abort functionality
  request: async function (method, url, data = {}) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await this.axiosInstance.request({
        method,
        url,
        data,
        signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error(`${method.toUpperCase()} request error:`, error);
        const res = error?.response?.data;
        throw res?.error || res?.message || error?.message;
      }
    }
  },

  // Function to make a GET request
  get: async function (url, params = {}) {
    return await this.request("get", url, params);
  },

  // Function to make a POST request
  post: async function (url, data = {}) {
    return await this.request("post", url, data);
  },

  // Function to make a PUT request
  put: async function (url, data = {}) {
    return await this.request("put", url, data);
  },

  // Function to make a DELETE request
  delete: async function (url, data = {}) {
    return await this.request("delete", url, data);
  },
};

export default ServiceAPI;
