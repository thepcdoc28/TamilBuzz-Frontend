import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});

// Intercept responses to catch JWT token format errors (422) or expiration (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 422)) {
            // Token is invalid, expired, or has an integer subject (422)
            localStorage.removeItem("tamilbuzz_token");
            localStorage.removeItem("tamilbuzz_user");
            
            // Redirect to login only if not already there
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;