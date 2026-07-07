import "./Director.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/MovieCard/MovieCard";
import CastCard from "../../components/CastCard/CastCard";

import { 
    getDirectorDetails, 
    getDirectorMovies, 
    getPopularDirectors,
    getProfileImage 
} from "../../services/directorServices";

function Director() {
    const { id } = useParams();
    
    const [loading, setLoading] = useState(true);
    
    // Directory States
    const [directorsList, setDirectorsList] = useState([]);
    const [directoryPage, setDirectoryPage] = useState(1);
    
    // Profile States
    const [directorDetails, setDirectorDetails] = useState(null);
    const [directedMovies, setDirectedMovies] = useState([]);

    useEffect(() => {
        if (id) {
            loadDirectorProfile();
        } else {
            loadDirectorsDirectory(directoryPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, directoryPage]);

    // State A: Load Global Popular Directors Directory
    const loadDirectorsDirectory = async (page) => {
        setLoading(true);
        try {
            const data = await getPopularDirectors(page);
            setDirectorsList(data.results || []);
        } catch (error) {
            console.error("Failed to load directors directory:", error);
        } finally {
            setLoading(false);
        }
    };

    // State B: Load Specific Director Profile
    const loadDirectorProfile = async () => {
        setLoading(true);
        try {
            const [details, credits] = await Promise.all([
                getDirectorDetails(id),
                getDirectorMovies(id)
            ]);
            
            setDirectorDetails(details);
            
            if (credits.crew) {
                const filteredMovies = credits.crew
                    .filter(item => item.job === "Director" && (item.media_type === "movie" || !item.media_type))
                    .sort((a, b) => b.popularity - a.popularity);
                
                const uniqueMovies = Array.from(new Set(filteredMovies.map(m => m.id)))
                    .map(uniqueId => filteredMovies.find(m => m.id === uniqueId))
                    .slice(0, 18);
                    
                setDirectedMovies(uniqueMovies);
            }
        } catch (error) {
            console.error("Failed to load director profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    // Condition A: Directory View
    if (!id) {
        return (
            <>
                <Navbar />
                <div className="director-container-main">
                    <div className="director-page-title">
                        <h1>Popular <span>Directors</span></h1>
                    </div>
                    <div className="actor-directory-grid">
                        {directorsList.map(person => (
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
                </div>
                <Footer />
            </>
        );
    }

    // Condition B: Not Found View
    if (id && !directorDetails) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
                    <h1>Director Not Found</h1>
                </div>
                <Footer />
            </>
        );
    }

    // Condition C: Profile View
    return (
        <>
            <Navbar />
            <div className="director-container-main">
                <div className="director-profile-layout">
                    
                    {/* Left Side Column */}
                    <div className="director-profile-sidebar">
                        <img 
                            src={getProfileImage(directorDetails.profile_path, "h632")} 
                            alt={directorDetails.name} 
                            className="director-profile-image"
                        />
                        <div className="director-meta-box">
                            <h3>Personal Info</h3>
                            <div className="director-meta-group">
                                <strong>Known For</strong>
                                <span>{directorDetails.known_for_department}</span>
                            </div>
                            <div className="director-meta-group">
                                <strong>Gender</strong>
                                <span>
                                    {directorDetails.gender === 1 ? "Female" : directorDetails.gender === 2 ? "Male" : "Not Specified"}
                                </span>
                            </div>
                            <div className="director-meta-group">
                                <strong>Birthday</strong>
                                <span>{directorDetails.birthday || "Unknown"}</span>
                            </div>
                            <div className="director-meta-group">
                                <strong>Place of Birth</strong>
                                <span>{directorDetails.place_of_birth || "Unknown"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Column */}
                    <div className="director-profile-content">
                        <div className="director-page-title">
                            <h1>{directorDetails.name}</h1>
                        </div>
                        
                        <div className="director-bio-section">
                            <h2>Biography</h2>
                            <p>{directorDetails.biography || `Biography details for ${directorDetails.name} are currently unavailable.`}</p>
                        </div>
                        
                        <div className="director-filmography-section">
                            <h2>Directed Movies</h2>
                            {directedMovies.length > 0 ? (
                                <div className="director-filmography-grid">
                                    {directedMovies.map(movie => (
                                        <MovieCard key={movie.id} movie={movie} />
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: "#888", fontStyle: "italic" }}>
                                    No Tamil directorial credits found.
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Director;