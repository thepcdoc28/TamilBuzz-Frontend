import api from "./api";

// The TMDb API provides all personnel details via a shared person endpoint
export const getDirectorDetails = async (id) => {
    const { data } = await api.get(`/person/${id}`);
    return data;
};

// We fetch their full filmography to be filtered inside the React component
export const getDirectorMovies = async (id) => {
    const { data } = await api.get(`/person/${id}/movies`);
    return data;
};

export const getPopularDirectors = async (page = 1) => {
    const { data } = await api.get("/person/popular-directors", { params: { page } });
    return data;
};

export const getProfileImage = (path, size = "h632") => {
    if (!path) return "https://via.placeholder.com/421x632?text=No+Image";
    return `https://image.tmdb.org/t/p/${size}${path}`;
};