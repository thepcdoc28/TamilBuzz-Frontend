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
   WATCHLIST (MySQL DB)
========================================== */
export const getWatchlist = async () => {
    const { data } = await api.get("/watchlist", getHeaders());
    return data;
};

export const addToWatchlist = async (movieId) => {
    const { data } = await api.post(`/watchlist/${movieId}`, {}, getHeaders());
    return data;
};

export const removeFromWatchlist = async (movieId) => {
    const { data } = await api.delete(`/watchlist/${movieId}`, getHeaders());
    return data;
};

/* ==========================================
   FAVORITES (MySQL DB)
========================================== */
export const getFavorites = async () => {
    const { data } = await api.get("/favorites", getHeaders());
    return data;
};

export const addToFavorites = async (movieId) => {
    const { data } = await api.post(`/favorites/${movieId}`, {}, getHeaders());
    return data;
};

export const removeFromFavorites = async (movieId) => {
    const { data } = await api.delete(`/favorites/${movieId}`, getHeaders());
    return data;
};

/* ==========================================
   RECENTLY VIEWED (Local Storage - Keep Fast)
========================================== */
const RECENT_KEY = "tamilbuzz_recent";

export const getRecentlyViewed = () => {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
};

export const addRecentlyViewed = (movie) => {
    let recent = getRecentlyViewed();
    recent = recent.filter(item => item.id !== movie.id);
    recent.unshift(movie);
    recent = recent.slice(0, 20); // Keep last 20
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
};

export const clearRecentlyViewed = () => {
    localStorage.removeItem(RECENT_KEY);
};