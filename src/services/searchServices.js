import api from "./api";

/* ==========================
   SEARCH MOVIES
========================== */

export const searchMovies = async (query, page = 1, type = "movie") => {

    if (!query || query.trim() === "") {
        return [];
    }

    const { data } = await api.get("/search", {
        params: {
            query,
            page,
            type
        }
    });

    return data;
};

/* ==========================
   MULTI SEARCH
========================== */

export const multiSearch = async (query, page = 1) => {

    if (!query || query.trim() === "") {
        return [];
    }

    const { data } = await api.get("/search/multi", {
        params: {
            query,
            page
        }
    });

    return data;
};

/* ==========================
   SEARCH BY YEAR
========================== */

export const searchByYear = async (year) => {

    const { data } = await api.get("/search/year", {
        params: {
            year
        }
    });

    return data;
};

/* ==========================
   SEARCH BY GENRE
========================== */

export const searchByGenre = async (genreId) => {

    const { data } = await api.get("/search/genre", {
        params: {
            genre: genreId
        }
    });

    return data;
};

/* ==========================
   ADVANCED SEARCH
========================== */

export const advancedSearch = async (filters = {}) => {

    const { data } = await api.get("/discover", {
        params: filters
    });

    return data;
};

/* ==========================
   SEARCH SUGGESTIONS
========================== */

export const getSearchSuggestions = async (query) => {

    if (!query || query.length < 2) {
        return [];
    }

    const movies = await searchMovies(query);

    if (!movies.results) {
        return [];
    }

    return movies.results.slice(0, 8);
};

/* ==========================
   LOCAL SEARCH HISTORY
========================== */

const STORAGE_KEY = "tamilbuzz_search_history";

export const saveSearchHistory = (query) => {

    if (!query) return;

    let history = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

    history = history.filter(
        item => item !== query
    );

    history.unshift(query);

    history = history.slice(0, 10);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );
};

export const getSearchHistory = () => {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];
};

export const clearSearchHistory = () => {

    localStorage.removeItem(STORAGE_KEY);

};