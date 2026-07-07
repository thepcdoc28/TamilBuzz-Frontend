import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* Logo */}
        <NavLink to="/" className="logo">

          <h1>

            Tamil<span>Buzz</span>

          </h1>

        </NavLink>

        {/* Navigation */}

        <nav className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

          <NavLink to="/movies">
            Movies
          </NavLink>

          <NavLink to="/actors">
            Actors
          </NavLink>

          <NavLink to="/directors">
            Directors
          </NavLink>

        </nav>

        {/* Right Side */}

        <div className="navbar-right">

          <SearchBar />

          <NavLink
            to="/profile"
            className="profile-icon"
          >

            <FaUserCircle />

          </NavLink>

        </div>

      </div>

    </header>
  );
}

export default Navbar;