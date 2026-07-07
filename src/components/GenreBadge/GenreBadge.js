import "./GenreBadge.css";

function GenreBadge({ genre }) {

    if (!genre) return null;

    return (

        <span className="genre-badge">

            {genre.name || genre}

        </span>

    );

}

export default GenreBadge;