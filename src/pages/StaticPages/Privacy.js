import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./StaticPage.css";

function Privacy() {
    return (
        <>
            <Navbar />
            <div className="static-page">
                <h1>Privacy Policy</h1>
                <p>Last updated: July 2026</p>
                
                <h2>1. Information We Collect</h2>
                <p>
                    At TamilBuzz, we collect information that you provide directly to us when you create an account, build a watchlist, or leave reviews. This includes your username, email address, and encrypted password.
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, maintain, and improve our services.</li>
                    <li>Personalize your experience (e.g., saving favorites).</li>
                    <li>Protect against malicious activity and ensure the security of our platform.</li>
                </ul>

                <h2>3. Third-Party Services</h2>
                <p>
                    We rely on third-party APIs such as TMDb (The Movie Database) for retrieving movie metadata, cast information, and posters. Please refer to TMDb's privacy policy for details on how they handle requests. We also use proxy services (like Invidious and Piped) to stream movie trailers without exposing your data to YouTube.
                </p>

                <h2>4. Data Security</h2>
                <p>
                    We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. Your passwords are securely hashed before being stored in our database.
                </p>
            </div>
            <Footer />
        </>
    );
}

export default Privacy;
