import "./MovieCard.css";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {

    if (!movie) return null;

    const poster = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : "https://placehold.co/300x450/1a1a1a/ffffff?text=No+Poster";

    const title = movie.title || movie.name || "Unknown Movie";

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "N/A";

    const year = (movie.release_date || movie.first_air_date)
        ? (movie.release_date || movie.first_air_date).slice(0, 4)
        : "----";

    const isTV = movie.media_type === "tv" || movie.first_air_date;
    const linkPath = isTV ? `/tv/${movie.id}` : `/movie/${movie.id}`;

    return (

        <Link
            to={linkPath}
            className="movie-link"
        >

            <div className="movie-card">

                <div className="poster-wrapper">

                    <img
                        src={poster}
                        alt={title}
                        className="movie-poster"
                    />

                    <div className="poster-overlay">

                        <button>

                            More Info

                        </button>

                    </div>

                </div>

                <div className="movie-content">

                    <h3>{title}</h3>

                    <div className="movie-meta">

                        <span>⭐ {rating}</span>

                        <span>{year}</span>

                    </div>

                </div>

            </div>

        </Link>

    );

}

export default MovieCard;