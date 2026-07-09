import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

import { getProfile, updateProfile, updateCurrentUser, logout, isAuthenticated } from "../../services/authServices";

function Profile() {
    const navigate = useNavigate();
    
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editUsername, setEditUsername] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);

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
            setEditUsername(data.user.username);
            setEditEmail(data.user.email);
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

    const handleSaveProfile = async () => {
        setError(null);
        setIsSaving(true);
        try {
            const data = await updateProfile({ username: editUsername, email: editEmail });
            setProfile(data.user);
            updateCurrentUser(data.user); // Update local storage
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-container">
                    
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="edit-icon-btn top-right">
                            <FaEdit />
                        </button>
                    )}

                    <div className="profile-header">
                        <FaUserCircle className="profile-avatar" />
                        
                        {isEditing ? (
                            <div className="edit-form">
                                <input 
                                    type="text" 
                                    value={editUsername} 
                                    onChange={(e) => setEditUsername(e.target.value)} 
                                    className="edit-input"
                                />
                                <input 
                                    type="email" 
                                    value={editEmail} 
                                    onChange={(e) => setEditEmail(e.target.value)} 
                                    className="edit-input"
                                />
                                <div className="edit-actions">
                                    <button onClick={handleSaveProfile} disabled={isSaving} className="save-btn">
                                        <FaSave /> {isSaving ? "Saving..." : "Save"}
                                    </button>
                                    <button onClick={() => { setIsEditing(false); setEditUsername(profile.username); setEditEmail(profile.email); }} className="cancel-btn">
                                        <FaTimes /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="profile-name-row">
                                    <h2>{profile?.username}</h2>
                                </div>
                                <p className="profile-email">{profile?.email}</p>
                                <p className="profile-joined">Member since: {profile?.joined}</p>
                            </>
                        )}
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