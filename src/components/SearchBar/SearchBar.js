import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Determine placeholder and type based on the current page
    let placeholder = "Search Tamil Movies...";
    let searchType = "movie";

    if (location.pathname.startsWith("/actor")) {
        placeholder = "Search Actor...";
        searchType = "actor";
    } else if (location.pathname.startsWith("/director")) {
        placeholder = "Search Director...";
        searchType = "director";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        
        // Push the user to the search page with their query and type in the URL
        navigate(`/search?q=${encodeURIComponent(search)}&type=${searchType}`);
        
        // Clear the input after searching
        setSearch("");
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <FaSearch className="search-icon" />
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    );
}

export default SearchBar;