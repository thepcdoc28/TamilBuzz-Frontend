import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaGithub
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-logo">

          <h2>
            Tamil<span>Buzz</span>
          </h2>

          <p>
            Discover Tamil Movies, Ratings, Cast,
            Trailers and OTT Platforms in one place.
          </p>

        </div>

        <div className="footer-links">

          <div>

            <h3>Explore</h3>

            <Link to="/">Home</Link>

            <Link to="/movies">Movies</Link>

          </div>

          <div>

            <h3>Library</h3>

            <Link to="/favorites">Favorites</Link>

            <Link to="/watchlist">Watchlist</Link>

            <Link to="/profile">Profile</Link>

          </div>

          <div>

            <h3>About</h3>

            <Link to="/privacy">Privacy</Link>

            <Link to="/terms">Terms</Link>

            <Link to="/contact">Contact</Link>

          </div>

        </div>

      </div>

      <div className="footer-social">

        <FaFacebookF />

        <FaInstagram />

        <FaYoutube />

        <FaGithub />

      </div>

      <div className="footer-bottom">

        © 2026 TamilBuzz • Powered by TMDb API

      </div>

    </footer>
  );
}

export default Footer;