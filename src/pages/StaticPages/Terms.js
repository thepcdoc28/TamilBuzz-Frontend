import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./StaticPage.css";
import ExitToMenuButton from "../../components/ExitToMenuButton/ExitToMenuButton";

function Terms() {
    return (
        <>
            <Navbar />
            <div className="static-page">
                <ExitToMenuButton />
                <h1>Terms of Service</h1>
                <p>Last updated: July 2026</p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using TamilBuzz, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our service.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                    TamilBuzz provides users with access to a rich collection of resources, including movie databases, ratings, reviews, cast information, and streaming availability. You understand that our service may include certain communications from TamilBuzz, such as service announcements.
                </p>

                <h2>3. User Conduct</h2>
                <p>
                    You agree to not use the service to post any reviews or comments that are unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, or otherwise objectionable. We reserve the right to remove any content and ban accounts that violate these guidelines.
                </p>

                <h2>4. Intellectual Property</h2>
                <p>
                    All movie metadata, images, and trailers displayed on TamilBuzz are provided by The Movie Database (TMDb) and their respective copyright holders. TamilBuzz does not claim ownership of any movie-related assets.
                </p>
            </div>
            <Footer />
        </>
    );
}

export default Terms;
