import axios from "axios";

const PUBLIC_API = axios.create({
  baseURL: "https://backend.rxexpresss.com/",
});

// Add a response interceptor to handle errors globally
PUBLIC_API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default PUBLIC_API;
