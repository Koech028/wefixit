// Centralized Axios instance
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
});

// 🔹 Attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        // Force capital B
        config.headers.Authorization = token.replace(/^bearer/i, "Bearer");
        console.log("🚀 Sending Auth Header:", config.headers.Authorization);
    }
    return config;
});

export default api;  // ✅ default export
