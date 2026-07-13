import "./MovieDetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaPlay, FaTimes, FaShareAlt } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import MovieSection from "../../components/MovieSection/MovieSection";
import CastCard from "../../components/CastCard/CastCard";
import GenreBadge from "../../components/GenreBadge/GenreBadge";
import OTTBadge from "../../components/OTTBadge/OTTBadge";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import TrailerPlayer from "../../components/TrailerPlayer/TrailerPlayer";
import { logMovieView } from "../../services/historyServices";

import {
    getMovieDetails,
    getMovieCast,
    getMovieCrew,
    getMovieVideos,
    getWatchProviders,
    getSimilarMovies,
    getMoviesByGenre,
    getBackdropURL,
    getImageURL,
    getYoutubeTrailer
} from "../../services/movieService";

import { isAuthenticated } from "../../services/authServices";
import { 
    getFavorites, addToFavorites, removeFromFavorites,
    getWatchlist, addToWatchlist, removeFromWatchlist
} from "../../services/watchlistServices";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Movie Data States
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [director, setDirector] = useState(null);
    const [providers, setProviders] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);

    const [showTrailerModal, setShowTrailerModal] = useState(false);

    // User Interaction States
    const [isFavorite, setIsFavorite] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        loadMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        // If the user is logged in, silently log this movie to their history
        if (isAuthenticated()) {
            logMovieView(id).catch(err => console.error("History sync failed:", err));
        }
    }, [id]);

    useEffect(() => {
        // Auto-play trailer if navigating from the Home page Hero section
        if (location.search.includes("playTrailer=true") && trailer) {
            setShowTrailerModal(true);
        }
    }, [location.search, trailer]);

    useEffect(() => {
        if (isAuthenticated() && movie) {
            checkUserCollections();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movie]);
    
    async function loadMovie() {
        try {
            const mediaType = location.pathname.startsWith("/tv") ? "tv" : "movie";

            // Fetch all movie data simultaneously for maximum speed
            const [details, castData, crewData, videoData, providerData, similar] = await Promise.all([
                getMovieDetails(id, mediaType),
                getMovieCast(id, mediaType),
                getMovieCrew(id, mediaType),
                getMovieVideos(id, mediaType),
                getWatchProviders(id, mediaType),
                getSimilarMovies(id, mediaType)
            ]);

            // Normalise the name/title so the rest of the UI doesn't crash if it's a TV show
            if (mediaType === "tv") {
                details.title = details.name;
                details.release_date = details.first_air_date;
                // TV shows don't have 'runtime', they have 'episode_run_time' or 'number_of_seasons'
                details.runtime = details.number_of_seasons ? `${details.number_of_seasons} Seasons` : "";
            }

            setMovie(details);
            setCast(castData.slice(0, 10));

            // Smart Fallback: If TMDb doesn't return similar movies (happens for regional movies),
            // fetch movies from the same primary genre to guarantee the section is never empty.
            let finalSimilar = similar;
            if ((!similar || similar.length === 0) && details.genres && details.genres.length > 0) {
                const genreId = details.genres[0].id;
                const genreData = await getMoviesByGenre(genreId);
                // Depending on the API, genreData might be an array or an object with a results array
                finalSimilar = Array.isArray(genreData) ? genreData : (genreData.results || []);
                // Filter out the current movie
                finalSimilar = finalSimilar.filter(m => m.id !== parseInt(id));
            }
            setSimilarMovies(finalSimilar);

            const movieDirector = crewData.find(person => person.job === "Director");
            setDirector(movieDirector);
            
            setTrailer(getYoutubeTrailer(videoData));

            if (providerData.results?.IN) {
                setProviders(providerData.results.IN.flatrate || []);
            }
        } catch (error) {
            console.error("Failed to load movie data concurrently:", error);
        }
    }

    async function checkUserCollections() {
        try {
            const [favs, watchlist] = await Promise.all([
                getFavorites(),
                getWatchlist()
            ]);
            
            // Check if current movie ID exists in user's lists
            setIsFavorite(favs.some(f => f.movie_id === parseInt(id)));
            setInWatchlist(watchlist.some(w => w.movie_id === parseInt(id)));
        } catch (error) {
            console.error("Failed to fetch user collections", error);
        }
    }

    // Toggle Favorite logic
    const handleFavoriteClick = async () => {
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }
        if (actionLoading) return;
        
        setActionLoading(true);
        try {
            if (isFavorite) {
                await removeFromFavorites(id);
                setIsFavorite(false);
            } else {
                await addToFavorites(id);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Favorite action failed", error);
        } finally {
            setActionLoading(false);
        }
    };

    // Toggle Watchlist logic
    const handleWatchlistClick = async () => {
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }
        if (actionLoading) return;
        
        setActionLoading(true);
        try {
            if (inWatchlist) {
                await removeFromWatchlist(id);
                setInWatchlist(false);
            } else {
                await addToWatchlist(id);
                setInWatchlist(true);
            }
        } catch (error) {
            console.error("Watchlist action failed", error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleShareClick = async () => {
        if (!movie) return;
        const shareData = {
            title: `TamilBuzz - ${movie.title}`,
            text: `Check out ${movie.title} on TamilBuzz!`,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback to WhatsApp
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`, '_blank');
            }
        } catch (error) {
            console.error("Error sharing", error);
        }
    };



    if (!movie) {
        return (
            <>
                <Navbar />
                <div className="movie-error">
                    <h1>Movie Not Found</h1>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <section
                className="movie-banner"
                style={{
                    backgroundImage: `linear-gradient(to top,#0f0f0f,rgba(0,0,0,.55)),url(${getBackdropURL(movie.backdrop_path)})`
                }}
            >
                <div className="movie-overlay">
                    <img
                        src={getImageURL(movie.poster_path)}
                        alt={movie.title}
                        className="movie-poster"
                    />
                    <div className="movie-information">
                        <h1>{movie.title}</h1>
                        
                        <div className="movie-meta">
                            <span>{movie.vote_average?.toFixed(1)} Rating</span>
                            <span>{movie.release_date}</span>
                            <span>{movie.runtime} mins</span>
                        </div>
                        
                        <div className="genre-list">
                            {movie.genres?.map(genre => (
                                <GenreBadge key={genre.id} genre={genre} />
                            ))}
                        </div>

                        {/* Interactive Buttons Addded Here */}
                        <div className="movie-actions">
                            {trailer && (
                                <button 
                                    className="action-btn play-trailer-btn"
                                    onClick={() => setShowTrailerModal(true)}
                                >
                                    <FaPlay /> Watch Trailer
                                </button>
                            )}
                            <button 
                                className={`action-btn ${isFavorite ? 'active' : ''}`}
                                onClick={handleFavoriteClick}
                                disabled={actionLoading}
                            >
                                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                {isFavorite ? 'Favorited' : 'Add to Favorites'}
                            </button>
                            
                            <button 
                                className={`action-btn ${inWatchlist ? 'active' : ''}`}
                                onClick={handleWatchlistClick}
                                disabled={actionLoading}
                            >
                                {inWatchlist ? <FaBookmark /> : <FaRegBookmark />}
                                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                            </button>

                            <button 
                                className="action-btn"
                                onClick={handleShareClick}
                            >
                                <FaShareAlt /> Share
                            </button>
                        </div>

                        <p className="overview">
                            {movie.overview}
                        </p>
                        
                        <div className="director">
                            <strong>Director :</strong>
                            {director ? (
                                <Link to={`/director/${director.id}`} style={{ color: "white", textDecoration: "none" }} className="director-link">
                                    {director.name}
                                </Link>
                            ) : "N/A"}
                        </div>
                    </div>
                </div>
            </section>

            {showTrailerModal && trailer && (
                <div 
                    className="trailer-modal-overlay" 
                    onClick={() => setShowTrailerModal(false)}
                >
                    <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setShowTrailerModal(false)}>
                            <FaTimes />
                        </button>
                        <TrailerPlayer videoKey={trailer.key} />
                    </div>
                </div>
            )}

            <section className="cast-section">
                <h2>Top Cast</h2>
                <div className="cast-grid">
                    {cast.map(actor => (
                        <CastCard key={actor.id} actor={actor} />
                    ))}
                </div>
            </section>

            {providers.length > 0 && (
                <section className="ott-section">
                    <h2>Streaming On</h2>
                    <div className="ott-grid">
                        {providers.map(provider => (
                            <OTTBadge key={provider.provider_id} provider={provider} />
                        ))}
                    </div>
                </section>
            )}

            <ReviewSection movieId={id} />

            <div className="similar-section">
                <MovieSection
                    title="Similar Movies"
                    movies={similarMovies}
                />
            </div>

            <Footer />
        </>
    );
}

export default MovieDetails;