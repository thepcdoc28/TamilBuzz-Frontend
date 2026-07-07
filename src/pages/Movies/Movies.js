import "./Movies.css";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import api from "../../services/api";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filter States
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [mediaType, setMediaType] = useState("all");

    // Static TMDb Movie Genre Mapping for clean matching
    const genresList = [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
        { id: 18, name: "Drama" },
        { id: 53, name: "Thriller" },
        { id: 10749, name: "Romance" },
        { id: 27, name: "Horror" },
        { id: 9648, name: "Mystery" },
        { id: 878, name: "Sci-Fi" },
        { id: 12, name: "Adventure" },
        { id: 14, name: "Fantasy" },
        { id: 16, name: "Animation" },
        { id: 10751, name: "Family" }
    ];

    // Dynamically generate year selections from 1950 up to the current year
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let y = currentYear; y >= 1970; y--) {
        yearsList.push(y);
    }

    // Reset page back to 1 whenever a filter combination updates
    useEffect(() => {
        setPage(1);
    }, [selectedGenre, selectedYear, selectedRating, mediaType]);

    // Query backend when page variations or filter options shift
    useEffect(() => {
        fetchFilteredMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, selectedGenre, selectedYear, selectedRating, mediaType]);

    const fetchFilteredMovies = async () => {
        setLoading(true);
        try {
            // Build out clean URL parameters matching our backend discover endpoint
            let url = `/discover?page=${page}&type=${mediaType}`;
            if (selectedGenre) url += `&genre=${selectedGenre}`;
            if (selectedYear) url += `&year=${selectedYear}`;
            if (selectedRating) url += `&rating=${selectedRating}`;

            const { data } = await api.get(url);
            setMovies(data.results || []);
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages || 1); // TMDb caps pagination requests at page 500
        } catch (error) {
            console.error("Discovery engine encountered an error fetching data:", error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="movies-page">
                <div className="movies-header">
                    <h1>Discover <span>Tamil Entertainment</span></h1>
                </div>

                <div className="media-type-toggle">
                    <button className={mediaType === "all" ? "active" : ""} onClick={() => setMediaType("all")}>All</button>
                    <button className={mediaType === "movie" ? "active" : ""} onClick={() => setMediaType("movie")}>Movies</button>
                    <button className={mediaType === "tv" ? "active" : ""} onClick={() => setMediaType("tv")}>Series</button>
                </div>

                {/* FILTERS PANEL DROPDOWNS */}
                <div className="filters-container">
                    {/* Genre Picker */}
                    <div className="filter-group">
                        <label>Genre</label>
                        <select 
                            value={selectedGenre} 
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            <option value="">All Genres</option>
                            {genresList.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Year Picker */}
                    <div className="filter-group">
                        <label>Release Year</label>
                        <select 
                            value={selectedYear} 
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="">All Years</option>
                            {yearsList.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* Rating Picker */}
                    <div className="filter-group">
                        <label>Minimum Rating</label>
                        <select 
                            value={selectedRating} 
                            onChange={(e) => setSelectedRating(e.target.value)}
                        >
                            <option value="">Any Rating</option>
                            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => (
                                <option key={num} value={num}>★ {num}+/10</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* FILTERED OUTPUT GRID */}
                {loading ? (
                    <Loader />
                ) : movies.length > 0 ? (
                    <>
                        <div className="movies-grid">
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {/* PAGINATION PANEL */}
                        <div className="movies-pagination">
                            <button 
                                disabled={page === 1} 
                                onClick={() => setPage(prev => prev - 1)}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button 
                                disabled={page >= totalPages} 
                                onClick={() => setPage(prev => prev + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="no-filter-results">
                        No Tamil movies match this specific filter combination. Try clearing some selections!
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Movies;
