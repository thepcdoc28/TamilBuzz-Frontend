import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero({ movie }) {
    const navigate = useNavigate();

    const backdrop = movie?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "https://placehold.co/1600x800/111111/F5C518?text=TamilBuzz";

    const title = movie?.title || "Featured Tamil Movie";

    const rating = movie?.vote_average
        ? movie.vote_average.toFixed(1)
        : "8.5";

    const year = movie?.release_date
        ? movie.release_date.slice(0,4)
        : "2025";

    const overview = movie?.overview ||
        "Discover the latest Tamil movies, trailers, cast, OTT platforms and ratings all in one place.";

    return (
        <section
            className="hero"
            style={{
                backgroundImage: `linear-gradient(to top, #0f0f0f, rgba(0,0,0,.45)), url(${backdrop})`
            }}
        >
            <div className="hero-content">
                <span className="featured">
                    Featured Movie
                </span>
                <h1>
                    {title}
                </h1>
                <div className="hero-info">
                    <span>⭐ {rating}</span>
                    <span>{year}</span>
                </div>
                <p>
                    {overview}
                </p>
                <div className="hero-buttons">
                    <button 
                        className="watch-btn"
                        onClick={() => movie?.id && navigate(`/movie/${movie.id}?playTrailer=true`)}
                    >
                        ▶ Watch Trailer
                    </button>
                    <button 
                        className="details-btn"
                        onClick={() => movie?.id && navigate(`/movie/${movie.id}`)}
                    >
                        More Details
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;