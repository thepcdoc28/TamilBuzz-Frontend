import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { login, register } from "../../services/authServices";

function Login() {
    const navigate = useNavigate();

    // Toggle between Login and Registration mode
    const [isLoginMode, setIsLoginMode] = useState(true);

    // Form State
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI State
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLoginMode) {
                // Execute Login
                await login(email, password);
                navigate("/"); // Redirect to home on success
            } else {
                // Execute Registration
                await register({ username, email, password });
                
                // If registration succeeds, log them in automatically
                await login(email, password);
                navigate("/"); 
            }
        } catch (err) {
            // Extract the error message safely from the backend response
            const errorMessage = err.response?.data?.error || "An unexpected error occurred. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError(null);
        setUsername("");
        setPassword("");
        // Keep the email if they already started typing it
    };

    return (
        <>
            <Navbar />
            
            <div className="login-page">
                <div className="auth-container">
                    
                    <h2>{isLoginMode ? "Welcome Back" : "Create Account"}</h2>

                    {error && <div className="auth-error">{error}</div>}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        
                        {/* Only show username field if registering */}
                        {!isLoginMode && (
                            <div className="input-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required={!isLoginMode}
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading 
                                ? "Processing..." 
                                : isLoginMode ? "Sign In" : "Sign Up"
                            }
                        </button>
                    </form>

                    <div className="auth-toggle">
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                        <button type="button" onClick={toggleMode}>
                            {isLoginMode ? "Sign Up Now" : "Sign In"}
                        </button>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default Login;