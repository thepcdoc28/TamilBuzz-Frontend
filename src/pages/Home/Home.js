import "./Home.css";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import MovieSection from "../../components/MovieSection/MovieSection";
import Footer from "../../components/Footer/Footer";

import {
    getTrendingMovies,
    getTopRatedMovies,
    getPopularMovies,
    getUpcomingMovies,
    getTrendingSeries,
    getTopRatedSeries,
    getPopularSeries,
    getActionMovies,
    getComedyMovies
} from "../../services/movieService";
import { getViewingHistory } from "../../services/historyServices";
import { isAuthenticated } from "../../services/authServices";

function Home() {


    const [isLoading, setIsLoading] = useState(true);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [historyMovies, setHistoryMovies] = useState([]);

    const [trendingSeries, setTrendingSeries] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);

    useEffect(() => {
        loadHome();
    }, []);

    const loadHome = async () => {
        setIsLoading(true);
        try {
            const promises = [
                getTrendingMovies(),
                getPopularMovies(),
                getTopRatedMovies(),
                getUpcomingMovies(),
                getTrendingSeries(),
                getPopularSeries(),
                getTopRatedSeries(),
                getActionMovies(),
                getComedyMovies()
            ];
            
            if (isAuthenticated()) {
                promises.push(getViewingHistory().catch(err => {
                    console.error("Failed to load history:", err);
                    return [];
                }));
            }

            const results = await Promise.all(promises);
            
            const trending = results[0];
            const popular = results[1];
            const topRated = results[2];
            const upcoming = results[3];
            const trendingSer = results[4];
            const popularSer = results[5];
            const topRatedSer = results[6];
            const actionMov = results[7];
            const comedyMov = results[8];
            const history = results[9];

            // Deduplicate movies across rows to maximize UI variety
            const seenIds = new Set();
            
            const filterUnique = (moviesList) => {
                return moviesList.filter(movie => {
                    if (seenIds.has(movie.id)) return false;
                    seenIds.add(movie.id);
                    return true;
                });
            };

            const uniqueTrending = filterUnique(trending);
            const uniquePopular = filterUnique(popular);
            const uniqueTopRated = filterUnique(topRated);
            const uniqueUpcoming = filterUnique(upcoming);
            
            setTrendingMovies(uniqueTrending);
            setPopularMovies(uniquePopular);
            setTopRatedMovies(uniqueTopRated);
            setUpcomingMovies(uniqueUpcoming);
            
            setTrendingSeries(trendingSer);
            setPopularSeries(popularSer);
            setTopRatedSeries(topRatedSer);
            setActionMovies(actionMov);
            setComedyMovies(comedyMov);
            
            if (history) {
                setHistoryMovies(history);
            }

            if (uniqueTrending.length > 0) {
                setFeaturedMovie(uniqueTrending[0]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) {
        return (
            <div className="home">
                <Navbar />
                <div className="loading-screen">
                    <h1>Loading Movies...</h1>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="home">
            <Navbar />
            <Hero movie={featuredMovie} />
            <main className="home-content">
                {historyMovies.length > 0 && (
                    <MovieSection
                        title="🕒 Continue Browsing"
                        movies={historyMovies}
                    />
                )}
                <MovieSection
                    title="🔥 Trending Tamil Movies"
                    movies={trendingMovies}
                />
                <MovieSection
                    title="🎬 Popular Movies"
                    movies={popularMovies}
                />
                <MovieSection
                    title="⭐ Top Rated"
                    movies={topRatedMovies}
                />
                <MovieSection
                    title="🆕 Upcoming Movies"
                    movies={upcomingMovies}
                />
                
                {trendingSeries.length > 0 && (
                    <MovieSection
                        title="📺 Trending TV Series"
                        movies={trendingSeries}
                    />
                )}
                
                {popularSeries.length > 0 && (
                    <MovieSection
                        title="🌟 Popular TV Series"
                        movies={popularSeries}
                    />
                )}
                
                {topRatedSeries.length > 0 && (
                    <MovieSection
                        title="🏆 Top Rated TV Series"
                        movies={topRatedSeries}
                    />
                )}
                
                {actionMovies.length > 0 && (
                    <MovieSection
                        title="💥 Action Packed"
                        movies={actionMovies}
                    />
                )}
                
                {comedyMovies.length > 0 && (
                    <MovieSection
                        title="😂 Laugh Riot (Comedy)"
                        movies={comedyMovies}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Home;