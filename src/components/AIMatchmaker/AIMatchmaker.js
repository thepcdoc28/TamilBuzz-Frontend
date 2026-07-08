import "./AIMatchmaker.css";
import { useState } from "react";
import { FaMagic, FaTimes, FaSpinner } from "react-icons/fa";
import { getAiMatchmaker } from "../../services/movieService";
import MovieCard from "../MovieCard/MovieCard";

function AIMatchmaker() {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!prompt.trim()) return;
        
        setIsLoading(true);
        setError(null);
        setResults([]);
        
        try {
            const data = await getAiMatchmaker(prompt);
            
            if (data.error) {
                setError(data.error);
            } else if (data.movies && data.movies.length > 0) {
                setResults(data.movies);
            } else {
                setError("No matching movies found. Try a different prompt!");
            }
        } catch (err) {
            setError("Failed to connect to the AI service. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button className="ai-floating-btn" onClick={handleOpen} title="AI Matchmaker">
                <FaMagic />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="ai-matchmaker-overlay" onClick={handleClose}>
                    <div 
                        className="ai-matchmaker-content" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="ai-close-btn" onClick={handleClose}>
                            <FaTimes />
                        </button>
                        
                        <div className="ai-header">
                            <h2><FaMagic /> <span>AI</span> Matchmaker</h2>
                            <p>Tell the AI what kind of movie you're in the mood for, and it will recommend the perfect Tamil movies for you!</p>
                        </div>
                        
                        <form className="ai-form" onSubmit={handleSubmit}>
                            <div className="ai-textarea-wrapper">
                                <textarea 
                                    className="ai-textarea"
                                    placeholder="e.g., 'I want a fast-paced thriller like Ratsasan but without romance'"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                className="ai-submit-btn"
                                disabled={isLoading || !prompt.trim()}
                            >
                                {isLoading ? (
                                    <><FaSpinner className="fa-spin" /> Thinking...</>
                                ) : (
                                    <><FaMagic /> Ask AI</>
                                )}
                            </button>
                            
                            {error && (
                                <div className="ai-error">
                                    {error}
                                </div>
                            )}
                        </form>
                        
                        {results.length > 0 && (
                            <div className="ai-results">
                                <h3>AI Recommendations</h3>
                                <div className="ai-grid">
                                    {results.map((movie) => (
                                        <div key={movie.id} onClick={handleClose}>
                                            <MovieCard movie={movie} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default AIMatchmaker;
