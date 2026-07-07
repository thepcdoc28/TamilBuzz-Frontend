import "./Actor.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import CastCard from "../../components/CastCard/CastCard";
import MovieCard from "../../components/MovieCard/MovieCard";

import { 
    getActorDetails, 
    getActorMovies, 
    getPopularActors, 
    getProfileImage 
} from "../../services/actorServices";

function Actor() {
    // If id is present in URL, we show profile details. If missing, we show directory list.
    const { id } = useParams();
    
    const [loading, setLoading] = useState(true);
    
    // Directory States
    const [actorsList, setActorsList] = useState([]);
    const [directoryPage, setDirectoryPage] = useState(1);
    
    // Profile States
    const [actorDetails, setActorDetails] = useState(null);
    const [associatedMovies, setAssociatedMovies] = useState([]);

    useEffect(() => {
        if (id) {
            loadIndividualProfile();
        } else {
            loadActorsDirectory(directoryPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, directoryPage]);

    // State A: Load Global Popular Actors Directory
    const loadActorsDirectory = async (page) => {
        setLoading(true);
        try {
            const data = await getPopularActors(page);
            setActorsList(data.results || []);
        } catch (error) {
            console.error("Failed to load actors directory:", error);
        } finally {
            setLoading(false);
        }
    };

    // State B: Load Specific Actor Biography and Filmography
    const loadIndividualProfile = async () => {
        setLoading(true);
        try {
            const [details, credits] = await Promise.all([
                getActorDetails(id),
                getActorMovies(id)
            ]);
            setActorDetails(details);
            
            if (credits.cast) {
                // Filter down to movies and rank by popularity metric
                const filteredMovies = credits.cast
                    .filter(item => item.media_type === "movie" || !item.media_type)
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 18); // Clean production grid slice
                setAssociatedMovies(filteredMovies);
            }
        } catch (error) {
            console.error("Failed to load individual profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <div className="actor-container-main">
                
                {/* CONDITION 1: RENDER DIRECTORY LIST IF NO ID PRESENT */}
                {!id ? (
                    <>
                        <div className="actor-page-title">
                            <h1>Popular <span>Actors</span></h1>
                        </div>
                        <div className="actor-directory-grid">
                            {actorsList.map(person => (
                                <CastCard key={person.id} actor={person} />
                            ))}
                        </div>
                        <div className="actor-directory-pagination">
                            <button 
                                disabled={directoryPage === 1} 
                                onClick={() => setDirectoryPage(directoryPage - 1)}
                            >
                                Previous
                            </button>
                            <span>Page {directoryPage}</span>
                            <button onClick={() => setDirectoryPage(directoryPage + 1)}>
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    /* CONDITION 2: RENDER INDIVIDUAL PROFILE IF ID IS PRESENT */
                    <>
                        <div className="actor-profile-layout">
                            {/* Left Side Column */}
                            <div className="actor-profile-sidebar">
                                <img 
                                    src={getProfileImage(actorDetails?.profile_path, actorDetails?.name, "h632")} 
                                    alt={actorDetails?.name} 
                                    className="actor-profile-image"
                                />
                                <div className="actor-meta-box">
                                    <h3>Personal Info</h3>
                                    <div className="actor-meta-group">
                                        <strong>Known For</strong>
                                        <span>{actorDetails?.known_for_department}</span>
                                    </div>
                                    <div className="actor-meta-group">
                                        <strong>Gender</strong>
                                        <span>
                                            {actorDetails?.gender === 1 ? "Female" : actorDetails?.gender === 2 ? "Male" : "Not Specified"}
                                        </span>
                                    </div>
                                    <div className="actor-meta-group">
                                        <strong>Birthday</strong>
                                        <span>{actorDetails?.birthday || "Unknown"}</span>
                                    </div>
                                    <div className="actor-meta-group">
                                        <strong>Place of Birth</strong>
                                        <span>{actorDetails?.place_of_birth || "Unknown"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Column */}
                            <div className="actor-profile-content">
                                <div className="actor-page-title">
                                    <h1>{actorDetails?.name}</h1>
                                </div>
                                <div className="actor-bio-section">
                                    <h2>Biography</h2>
                                    <p>{actorDetails?.biography || `Biography details for ${actorDetails?.name} are currently unavailable.`}</p>
                                </div>
                                <div className="actor-filmography-section">
                                    <h2>Known For</h2>
                                    <div className="actor-filmography-grid">
                                        {associatedMovies.map(movie => (
                                            <MovieCard key={movie.id} movie={movie} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                
            </div>
            <Footer />
        </>
    );
}

export default Actor;