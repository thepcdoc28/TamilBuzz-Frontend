import "./Search.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import CastCard from "../../components/CastCard/CastCard";
import Loader from "../../components/Loader/Loader";
import { searchMovies } from "../../services/searchServices";

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const searchType = searchParams.get("type") || "movie";
    
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            fetchSearchResults();
        } else {
            setResults([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, searchType]);

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const data = await searchMovies(query, 1, searchType);
            setResults(data.results || []);
        } catch (error) {
            console.error("Failed to fetch search results:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="search-page">
                <div className="search-header">
                    {query ? (
                        <h1>Search {searchType === "actor" ? "Actors" : searchType === "director" ? "Directors" : "Results"} for: <span>"{query}"</span></h1>
                    ) : (
                        <h1>Enter a query to search</h1>
                    )}
                </div>

                {loading ? (
                    <Loader />
                ) : results.length > 0 ? (
                    <div className={searchType === "movie" ? "search-grid" : "person-grid"}>
                        {results.map(item => (
                            searchType === "movie" 
                                ? <MovieCard key={item.id} movie={item} />
                                : <CastCard key={item.id} actor={item} />
                        ))}
                    </div>
                ) : query && !loading ? (
                    <div className="no-results">
                        <h2>No Matches Found</h2>
                        <p>We couldn't find any matches for "{query}". Try another search term.</p>
                    </div>
                ) : null}
            </div>
            <Footer />
        </>
    );
}

export default Search;