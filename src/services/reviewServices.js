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
   REVIEWS (MySQL DB)
========================================== */

// Fetch all reviews for a specific movie (Public)
export const getMovieReviews = async (movieId) => {
    const { data } = await api.get(`/reviews/${movieId}`);
    return data;
};

// Submit a new review (Protected)
export const addMovieReview = async (movieId, reviewData) => {
    // reviewData expects: { rating: float, review_text: string }
    const { data } = await api.post(`/reviews/${movieId}`, reviewData, getHeaders());
    return data;
};

// Delete a user's own review (Protected)
export const deleteMovieReview = async (reviewId) => {
    const { data } = await api.delete(`/reviews/review/${reviewId}`, getHeaders());
    return data;
};