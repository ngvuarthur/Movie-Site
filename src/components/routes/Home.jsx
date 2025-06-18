import { useEffect, useState } from "react";
import "../../styles/Home.css";
import MovieCard from "../MovieCard";
import NavBar from "../NavBar";
import MovieDetail from "./MovieDetail"

function Home() {
    const [featMovie, setFeatMovie] = useState(null);
    const [moviesByGenre, setMoviesByGenre] = useState({});
    const [searchMovie, setSearchMovie] = useState("");

    useEffect(() => {
    fetch('https://loki.trentu.ca/~shubarnasunuwar/3430/assn/assign2/api/movies')
    .then((response) => response.json())
    .then((movies) => {
        const genresMap = {};
            movies.forEach((movie) => {
                const parsedGenres = JSON.parse(movie.genres);
                parsedGenres.forEach((genre) => {
                    if (!genresMap[genre.name]) {
                        genresMap[genre.name] = [];
                    }
                    genresMap[genre.name].push(movie);
                });
            });

            setMoviesByGenre(genresMap);
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            setFeatMovie(randomMovie);
        })
    .catch((error) => console.error("Error fetching movies: ", error));
    }, []);

    function scrollRow(genreName, direction) {
        const row = document.getElementById(genreName);
        const scrollAmount = direction === "left" ? -300 : 300;
        row.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    return (
    <>
    <header>
        <NavBar searchMovie={setSearchMovie}></NavBar>
    </header>

    <main>
        
        <div className="home">
        {featMovie && (
            <div className="feat-movie">
                <img className="feat-poster" src={featMovie.poster} alt={featMovie.title}/>
                <div className="feat-content">
                    <h1 className="feat-title">{featMovie.title}</h1>
                        <div className="feat-buttons">
                            <button>Watch Now</button>
                            <button>Add to Watchlist</button>
                        </div>
                </div>
            </div>
        )}

        <div className="genres">
            {Object.keys(moviesByGenre).map((genreName) => (
                <div key={genreName} className="genre-section">
                <h2 className="genre">{genreName}</h2>
                <div className="movie-row-wrapper">
                <button className="scroll-arrow left" onClick={() => scrollRow(genreName, "left")}>&#8249;</button>
                <div id={genreName} className="movie-row">
                    {moviesByGenre[genreName].map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                        />
                    ))}
                </div>
                <button className="scroll-arrow right" onClick={() => scrollRow(genreName, "right")}>&#8250;</button>
                </div>
            </div>
            ))}
        </div>
        </div>
    </main>
    </>
    );
}

export default Home;
