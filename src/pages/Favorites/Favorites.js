import "./Favorites.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import ExitToMenuButton from "../../components/ExitToMenuButton/ExitToMenuButton";
import Loader from "../../components/Loader/Loader";
import { getFavorites } from "../../services/watchlistServices";
import { getMovieDetails } from "../../services/movieService";
import { isAuthenticated } from "../../services/authServices";

function Favorites() {
    const navigate = useNavigate();
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Protect route: Redirect to login if no token is found
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }
        loadUserFavorites();
    }, [navigate]);

    const loadUserFavorites = async () => {
        try {
            // 1. Fetch user's favorite IDs from MySQL backend
            const favoriteRecords = await getFavorites();
            
            // 2. Fetch full movie details from TMDb for each ID
            if (favoriteRecords.length > 0) {
                const moviePromises = favoriteRecords.map(record => 
                    getMovieDetails(record.movie_id)
                );
                
                // Wait for all TMDb API calls to finish
                const fullMoviesData = await Promise.all(moviePromises);
                setFavoriteMovies(fullMoviesData);
            }
        } catch (error) {
            console.error("Error loading favorites:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <Navbar />
            <div className="favorites-page">
                <ExitToMenuButton />
                <div className="favorites-header">
                    <h1>Your <span>Favorites</span></h1>
                </div>
                {loading ? <Loader /> : (
                    favoriteMovies.length > 0 ? (
                        <div className="favorites-grid">
                            {favoriteMovies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-favorites">
                            <h2>No Favorites Yet</h2>
                            <p>
                                You haven't added any movies to your favorites. 
                                Browse our collection and click the heart icon on a movie to add it here.
                            </p>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </>
    );
}

export default Favorites;