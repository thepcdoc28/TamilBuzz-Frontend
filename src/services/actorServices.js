import api from "./api";

/* ==========================
   ACTOR DETAILS
========================== */

export const getActorDetails = async (actorId) => {

    const { data } = await api.get(`/person/${actorId}`);

    return data;

};

/* ==========================
   ACTOR MOVIES
========================== */

export const getActorMovies = async (actorId) => {

    const { data } = await api.get(`/person/${actorId}/movies`);

    return data;

};

/* ==========================
   COMBINED CREDITS
========================== */

export const getCombinedCredits = async (actorId) => {

    const { data } = await api.get(`/person/${actorId}/credits`);

    return data;

};

/* ==========================
   IMAGES
========================== */

export const getActorImages = async (actorId) => {

    const { data } = await api.get(`/person/${actorId}/images`);

    return data;

};

/* ==========================
   SOCIAL LINKS
========================== */

export const getActorSocialLinks = async (actorId) => {

    const { data } = await api.get(`/person/${actorId}/external`);

    return data;

};

/* ==========================
   POPULAR PEOPLE
========================== */

export const getPopularActors = async (page = 1) => {

    const { data } = await api.get("/person/popular", {
        params: {
            page
        }
    });

    return data;

};

/* ==========================
   SEARCH ACTORS
========================== */

export const searchActors = async (query) => {

    if (!query || query.trim() === "") {

        return [];

    }

    const { data } = await api.get("/person/search", {
        params: {
            query
        }
    });

    return data;

};

/* ==========================
   PROFILE IMAGE
========================== */

export const getProfileImage = (
    profilePath,
    name = "Unknown",
    size = "w500"
) => {

    if (!profilePath) {

        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=500&font-size=0.33`;

    }

    return `https://image.tmdb.org/t/p/${size}${profilePath}`;

};
