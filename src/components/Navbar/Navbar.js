import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import Sidebar from "../Sidebar/Sidebar";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openSidebar) {
      setIsSidebarOpen(true);
      // Clear state so it doesn't re-open on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="navbar">

      <div className="navbar-container">
        
        <div className="navbar-left">
          {/* Hamburger Menu Icon */}
          <button className="menu-icon" onClick={toggleSidebar}>
            <FaBars />
          </button>

          {/* Logo */}
          <NavLink to="/" className="logo">

            <h1>

              Tamil<span>Buzz</span>

            </h1>

          </NavLink>

          {/* Mobile Profile Icon */}
          <NavLink to="/profile" className="profile-icon mobile-profile">
            <FaUserCircle />
          </NavLink>
        </div>

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
            className="profile-icon desktop-profile"
          >

            <FaUserCircle />

          </NavLink>

        </div>

      </div>

    </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Navbar;