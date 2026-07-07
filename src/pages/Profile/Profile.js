import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { getProfile, logout, isAuthenticated } from "../../services/authServices";

function Profile() {
    const navigate = useNavigate();
    
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Protect the route: if not logged in, boot them to the login page
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }
        loadUserProfile();
    }, [navigate]);

    const loadUserProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data.user);
        } catch (err) {
            setError("Failed to securely load profile data. Please try logging in again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout(); // Clears JWT token from localStorage
        navigate("/"); // Redirect safely to home page
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-container">
                    
                    <div className="profile-header">
                        <FaUserCircle className="profile-avatar" />
                        <h2>{profile?.username}</h2>
                        <p className="profile-email">{profile?.email}</p>
                        <p className="profile-joined">Member since: {profile?.joined}</p>
                    </div>

                    {error && <div className="profile-error">{error}</div>}

                    <div className="profile-actions">
                        <button className="logout-btn" onClick={handleLogout}>
                            <FaSignOutAlt /> Secure Log Out
                        </button>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;