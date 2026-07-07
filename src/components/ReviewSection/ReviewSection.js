import "./ReviewSection.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovieReviews, addMovieReview, deleteMovieReview } from "../../services/reviewServices";
import { isAuthenticated, getCurrentUser } from "../../services/authServices";

function ReviewSection({ movieId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form State
    const [rating, setRating] = useState("10");
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const user = getCurrentUser();
    const loggedIn = isAuthenticated();

    useEffect(() => {
        loadReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId]);

    const loadReviews = async () => {
        try {
            const data = await getMovieReviews(movieId);
            setReviews(data);
        } catch (err) {
            console.error("Failed to load reviews:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await addMovieReview(movieId, { 
                rating: parseFloat(rating), 
                review_text: reviewText 
            });
            
            // Clear form and reload list on success
            setRating("10");
            setReviewText("");
            await loadReviews();
        } catch (err) {
            setError(err.response?.data?.error || "Failed to publish review.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        
        try {
            await deleteMovieReview(reviewId);
            await loadReviews(); // Refresh the list
        } catch (err) {
            alert("Failed to delete review.");
        }
    };

    // Check if the current user already left a review to hide the form
    const hasReviewed = loggedIn && reviews.some(r => r.username === user?.username);

    return (
        <section className="review-section">
            <h2>Community Reviews</h2>

            {/* Render Form or Login Prompt */}
            {!loggedIn ? (
                <div className="login-prompt">
                    Want to share your thoughts? 
                    <Link to="/login">Log in to write a review.</Link>
                </div>
            ) : hasReviewed ? (
                <div className="login-prompt">
                    You have already reviewed this movie. Thank you for your feedback!
                </div>
            ) : (
                <div className="review-form-container">
                    <h3>Write a Review</h3>
                    <form className="review-form" onSubmit={handleSubmit}>
                        
                        {error && <div className="review-error">{error}</div>}

                        <div className="review-input-group">
                            <label>Rating (Out of 10)</label>
                            <select 
                                value={rating} 
                                onChange={(e) => setRating(e.target.value)}
                                required
                            >
                                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => (
                                    <option key={num} value={num}>{num} / 10</option>
                                ))}
                            </select>
                        </div>

                        <div className="review-input-group">
                            <label>Your Review</label>
                            <textarea 
                                placeholder="What did you think of the movie?"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="submit-review-btn"
                            disabled={submitting}
                        >
                            {submitting ? "Publishing..." : "Publish Review"}
                        </button>
                    </form>
                </div>
            )}

            {/* Render Review List */}
            {loading ? (
                <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
                <div className="reviews-list">
                    {reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <div className="review-author">
                                    {review.username}
                                    <span className="review-rating">★ {review.rating}</span>
                                </div>
                                <div className="review-date">{review.created_at}</div>
                            </div>
                            <div className="review-body">
                                {review.review_text}
                            </div>
                            
                            {/* Only show delete button to the review's author */}
                            {loggedIn && user?.username === review.username && (
                                <button 
                                    className="delete-review-btn"
                                    onClick={() => handleDelete(review.id)}
                                >
                                    Delete my review
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-reviews">No reviews yet. Be the first to share your thoughts!</p>
            )}
        </section>
    );
}

export default ReviewSection;