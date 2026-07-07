import "./CastCard.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function CastCard({ actor }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (!actor) return;

        const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=random&color=fff&size=500&font-size=0.33`;

        if (actor.profile_path) {
            setImage(`${IMAGE_BASE_URL}${actor.profile_path}`);
        } else {
            // Try to find an image on Wikipedia!
            fetchWikiImage(actor.name).then(wikiImg => {
                if (wikiImg) {
                    setImage(wikiImg);
                } else {
                    setImage(fallbackImage);
                }
            });
        }
    }, [actor]);

    const fetchWikiImage = async (name) => {
        try {
            const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + " actor")}&utf8=&format=json&origin=*`;
            const res = await fetch(searchUrl);
            const data = await res.json();
            
            if (data.query?.search?.length > 0) {
                const title = data.query.search[0].title;
                const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300&origin=*`;
                const imgRes = await fetch(imgUrl);
                const imgData = await imgRes.json();
                
                const pages = imgData.query?.pages;
                if (pages) {
                    const pageId = Object.keys(pages)[0];
                    if (pages[pageId].thumbnail) {
                        return pages[pageId].thumbnail.source;
                    }
                }
            }
        } catch (e) {
            console.error("Wiki fetch failed:", e);
        }
        return null;
    };

    if (!actor) return null;

    return (
        <Link
            to={actor.known_for_department === "Directing" ? `/director/${actor.id}` : `/actor/${actor.id}`}
            className="cast-link"
        >
            <div className="cast-card">
                <img
                    src={image || `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=222&color=fff&size=500&font-size=0.33`}
                    alt={actor.name}
                />
                <div className="cast-info">
                    <h3>{actor.name}</h3>
                </div>
            </div>
        </Link>
    );
}

export default CastCard;