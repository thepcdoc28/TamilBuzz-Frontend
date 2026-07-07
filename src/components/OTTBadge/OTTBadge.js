import "./OTTBadge.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";

function OTTBadge({ provider }) {

    if (!provider) return null;

    return (

        <div className="ott-badge">

            <img
                src={`${IMAGE_BASE_URL}${provider.logo_path}`}
                alt={provider.provider_name}
            />

            <span>

                {provider.provider_name}

            </span>

        </div>

    );

}

export default OTTBadge;