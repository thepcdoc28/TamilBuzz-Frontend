import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import Search from "../pages/Search/Search";
import Actor from "../pages/Actor/Actor"; // The single, locked import
import Director from "../pages/Director/Director";
import Favorites from "../pages/Favorites/Favorites";
import Watchlist from "../pages/Watchlist/Watchlist";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Privacy from "../pages/StaticPages/Privacy";
import Terms from "../pages/StaticPages/Terms";
import Contact from "../pages/StaticPages/Contact";
import About from "../pages/StaticPages/About";
import FAQ from "../pages/StaticPages/FAQ";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/tv/:id" element={<MovieDetails />} />
      <Route path="/search" element={<Search />} />
      
      {/* Both navigation triggers mount the exact same locked Actor component */}
      <Route path="/actors" element={<Actor />} />
      <Route path="/actor/:id" element={<Actor />} />
      
      {/* Both navigation triggers mount the exact same polymorphic Director component */}
      <Route path="/directors" element={<Director />} />
      <Route path="/director/:id" element={<Director />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Static Pages */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      
      {/* Settings */}
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AppRoutes;