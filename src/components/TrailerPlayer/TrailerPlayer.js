import { useState, useEffect } from "react";
import "./TrailerPlayer.css";

function TrailerPlayer({ videoKey }) {
    const [streamUrl, setStreamUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!videoKey) return;

        const fetchStream = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch the raw video streams from Piped API (a YouTube proxy)
                const res = await fetch(`https://pipedapi.kavin.rocks/streams/${videoKey}`);
                if (!res.ok) throw new Error("Failed to fetch stream");
                
                const data = await res.json();
                
                // Find a good quality mp4 stream (usually 720p or 1080p)
                const streams = data.videoStreams;
                if (streams && streams.length > 0) {
                    // Try to find 720p or 1080p mp4, fallback to first available
                    const preferred = streams.find(s => s.mimeType === "video/mp4" && (s.quality === "1080p" || s.quality === "720p")) || streams[0];
                    setStreamUrl(preferred.url);
                } else {
                    throw new Error("No video streams found");
                }
            } catch (err) {
                console.error("Trailer fetch error:", err);
                setError("Unable to bypass firewall. Stream unavailable.");
            } finally {
                setLoading(false);
            }
        };

        fetchStream();
    }, [videoKey]);

    if (loading) {
        return (
            <div className="trailer-player-loading">
                <div className="spinner"></div>
                <p>Establishing secure tunnel...</p>
            </div>
        );
    }

    if (error || !streamUrl) {
        return (
            <div className="trailer-player-error">
                <p>{error || "Video unavailable"}</p>
            </div>
        );
    }

    return (
        <video 
            className="native-trailer-video"
            controls 
            autoPlay 
            src={streamUrl}
        />
    );
}

export default TrailerPlayer;
