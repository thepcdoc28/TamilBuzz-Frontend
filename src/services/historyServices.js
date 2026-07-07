import api from "./api";
import { getToken } from "./authServices";

/* ==========================================
   AUTHENTICATION HEADER HELPER
========================================== */
const getHeaders = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

/* ==========================================
   HISTORY API CALLS
========================================== */

// Fetch the user's recently viewed movies
export const getViewingHistory = async () => {
    const { data } = await api.get("/history", getHeaders());
    return data;
};

// Silently log a movie view
export const logMovieView = async (movieId) => {
    const { data } = await api.post(`/history/${movieId}`, {}, getHeaders());
    return data;
};
