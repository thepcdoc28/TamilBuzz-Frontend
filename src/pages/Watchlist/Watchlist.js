import "./Watchlist.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import ExitToMenuButton from "../../components/ExitToMenuButton/ExitToMenuButton";
import Loader from "../../components/Loader/Loader";
import { getWatchlist } from "../../services/watchlistServices";
import { getMovieDetails } from "../../services/movieService";
import { isAuthenticated } from "../../services/authServices";

function Watchlist() {
    const navigate = useNavigate();
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Protect route: Redirect to login if no token is found
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }
        loadUserWatchlist();
    }, [navigate]);

    const loadUserWatchlist = async () => {
        try {
            // 1. Fetch user's watchlist IDs from MySQL backend
            const watchlistRecords = await getWatchlist();
            
            // 2. Fetch full movie details from TMDb for each ID
            if (watchlistRecords.length > 0) {
                const moviePromises = watchlistRecords.map(record => 
                    getMovieDetails(record.movie_id)
                );
                
                // Wait for all TMDb API calls to finish
                const fullMoviesData = await Promise.all(moviePromises);
                setWatchlistMovies(fullMoviesData);
            }
        } catch (error) {
            console.error("Error loading watchlist:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <Navbar />
            <div className="watchlist-page">
                <ExitToMenuButton />
                <div className="watchlist-header">
                    <h1>Your <span>Watchlist</span></h1>
                </div>
                {loading ? <Loader /> : (
                    watchlistMovies.length > 0 ? (
                        <div className="watchlist-grid">
                            {watchlistMovies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-watchlist">
                            <h2>Your Watchlist is Empty</h2>
                            <p>
                                Keep track of movies you want to watch later. 
                                Click the bookmark icon on any movie to add it to this list.
                            </p>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </>
    );
}

export default Watchlist;