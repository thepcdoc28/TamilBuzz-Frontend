import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./MovieSection.css";
import MovieCard from "../MovieCard/MovieCard";

function MovieSection({ title, movies = [] }) {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            // Scroll by 80% of the container width to keep some overlap
            const scrollAmount = direction === "left" ? -(clientWidth * 0.8) : (clientWidth * 0.8);
            rowRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="movie-section">
            <div className="section-header">
                <h2>{title}</h2>
                <button className="view-all">View All</button>
            </div>
            
            <div className="slider-container">
                {movies.length > 0 && (
                    <button className="scroll-btn left" onClick={() => scroll("left")}>
                        <FaChevronLeft />
                    </button>
                )}
                
                <div className="movie-row" ref={rowRef}>
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <p className="no-movies">No movies available.</p>
                    )}
                </div>

                {movies.length > 0 && (
                    <button className="scroll-btn right" onClick={() => scroll("right")}>
                        <FaChevronRight />
                    </button>
                )}
            </div>
        </section>
    );
}

export default MovieSection;