import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PRIVATE_API = axios.create({
  baseURL: "https://backend.rxexpresss.com/",
});

// Attach a token to each request
PRIVATE_API.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Error fetching token:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
PRIVATE_API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Response error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default PRIVATE_API;