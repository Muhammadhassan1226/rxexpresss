import axios from "axios";

const PRIVATE_API = axios.create({
    baseURL: "https://backend.rxexpresss.com/",
});

// Attach a token to each request
PRIVATE_API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error (e.g., when no token is available)
        return Promise.reject(error);
    },
);

// Add a response interceptor to handle errors globally
PRIVATE_API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default PRIVATE_API;
