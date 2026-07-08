import "./TrailerPlayer.css";

function TrailerPlayer({ videoKey }) {
    if (!videoKey) {
        return (
            <div className="trailer-player-error">
                <p>Video unavailable</p>
            </div>
        );
    }

    return (
        <iframe
            className="native-trailer-video"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
    );
}

export default TrailerPlayer;
