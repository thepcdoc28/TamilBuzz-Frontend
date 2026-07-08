import api from "./api";

/* ==========================
   HOME
========================== */

export const getTrendingMovies = async () => {
    const { data } = await api.get("/trending");
    return data;
};

export const getPopularMovies = async () => {
    const { data } = await api.get("/popular");
    return data;
};

export const getTopRatedMovies = async () => {
    const { data } = await api.get("/top-rated");
    return data;
};

export const getUpcomingMovies = async () => {
    const { data } = await api.get("/upcoming");
    return data;
};

export const getNowPlayingMovies = async () => {
    const { data } = await api.get("/now-playing");
    return data;
};

/* ==========================
   DETAILS
========================== */

export const getMovieDetails = async (movieId, mediaType = "movie") => {
    const { data } = await api.get(`/movie/${movieId}?type=${mediaType}`);
    return data;
};

export const getMovieCredits = async (movieId) => {
    const { data } = await api.get(`/movie/${movieId}/credits`);
    return data;
};

export const getMovieCast = async (movieId, mediaType = "movie") => {
    const { data } = await api.get(`/movie/${movieId}/cast?type=${mediaType}`);
    return data;
};

export const getMovieCrew = async (movieId, mediaType = "movie") => {
    const { data } = await api.get(`/movie/${movieId}/crew?type=${mediaType}`);
    return data;
};

export const getMovieImages = async (movieId) => {
    const { data } = await api.get(`/movie/${movieId}/images`);
    return data;
};

export const getMovieVideos = async (movieId, mediaType = "movie") => {
    const { data } = await api.get(`/movie/${movieId}/videos?type=${mediaType}`);
    return data;
};

export const getMovieReviews = async (movieId) => {
    const { data } = await api.get(`/movie/${movieId}/reviews`);
    return data;
};

export const getMovieRecommendations = async (movieId) => {
    const { data } = await api.get(`/movie/${movieId}/recommendations`);
    return data;
};

export const getSimilarMovies = async (movieId, mediaType = "movie") => {
    const { data } = await api.get(`/movie/${movieId}/similar?type=${mediaType}`);
    return data;
};

export const getWatchProviders = async (movieId, mediaType = "movie") => {
    const { data } = await api.get(`/movie/${movieId}/providers?type=${mediaType}`);
    return data;
};

/* ==========================
   GENRES
========================== */

export const getGenres = async () => {
    const { data } = await api.get("/genres");
    return data;
};

export const getMoviesByGenre = async (genreId) => {
    const { data } = await api.get(`/genre/${genreId}`);
    return data;
};

/* ==========================
   DISCOVER
========================== */

export const discoverMovies = async (params = {}) => {
    const { data } = await api.get("/discover", {
        params
    });

    return data;
};

/* ==========================
   LANGUAGES
========================== */

export const getLanguages = async () => {
    const { data } = await api.get("/languages");
    return data;
};

/* ==========================
   UTILITIES
========================== */

export const getImageURL = (path, size = "w500") => {

    if (!path) {

        return "https://placehold.co/500x750?text=No+Image";

    }

    return `https://image.tmdb.org/t/p/${size}${path}`;

};

export const getBackdropURL = (path) => {

    if (!path) {

        return "https://placehold.co/1280x720?text=No+Backdrop";

    }

    return `https://image.tmdb.org/t/p/original${path}`;

};

export const getYoutubeTrailer = (videos) => {
    if (!videos?.results || videos.results.length === 0) {
        return null;
    }

    const youtubeVideos = videos.results.filter((video) => video.site === "YouTube");
    if (youtubeVideos.length === 0) {
        return null;
    }

    // 1. Try to find a Tamil Trailer
    let bestMatch = youtubeVideos.find(
        (video) => video.type === "Trailer" && video.iso_639_1 === "ta"
    );

    // 2. Try to find a Tamil Teaser
    if (!bestMatch) {
        bestMatch = youtubeVideos.find(
            (video) => video.type === "Teaser" && video.iso_639_1 === "ta"
        );
    }

    // 3. Try to find any Trailer (fallback for movies with only Telugu/Hindi/English trailers)
    if (!bestMatch) {
        bestMatch = youtubeVideos.find((video) => video.type === "Trailer");
    }

    // 4. Try to find any Teaser
    if (!bestMatch) {
        bestMatch = youtubeVideos.find((video) => video.type === "Teaser");
    }
    
    // 5. Fallback to absolutely any YouTube video attached to the movie
    if (!bestMatch) {
        bestMatch = youtubeVideos[0];
    }

    return bestMatch || null;
};