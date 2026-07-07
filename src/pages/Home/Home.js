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
    getUpcomingMovies
} from "../../services/movieService";

function Home() {

    const [loading, setLoading] = useState(true);

    const [featuredMovie, setFeaturedMovie] = useState(null);

    const [trendingMovies, setTrendingMovies] = useState([]);

    const [popularMovies, setPopularMovies] = useState([]);

    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {

        loadHome();

    }, []);

    const loadHome = async () => {
        try {
            const [
                trending,
                popular,
                topRated,
                upcoming
            ] = await Promise.all([
                getTrendingMovies(),
                getPopularMovies(),
                getTopRatedMovies(),
                getUpcomingMovies()
            ]);

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

            if (uniqueTrending.length > 0) {
                setFeaturedMovie(uniqueTrending[0]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {

        return (

            <div className="loading-screen">

                <h1>Loading TamilBuzz...</h1>

            </div>

        );

    }

    return (

        <div className="home">

            <Navbar />

            <Hero movie={featuredMovie} />

            <main className="home-content">

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

            </main>

            <Footer />

        </div>

    );

}

export default Home;