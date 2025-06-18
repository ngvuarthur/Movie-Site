import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/MovieDetail.css"
import NavBar from "../NavBar";

function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://loki.trentu.ca/~shubarnasunuwar/3430/assn/assign2/api/movies/${movieId}`)
        .then((response) => response.json())
        .then((data) => {
            const parsedGenres = JSON.parse(data.genres).map((genre) => genre.name).join(", ");
            setMovie({ ...data, genres: parsedGenres });
        })
        .catch((error) => console.error("Error fetching movie details:", error));
    }, [movieId]);

    if (!movie) return <p>Loading movie details...</p>;

    return (
        <>
        <header>
            <NavBar></NavBar>
        </header>
        <main>
            <div className="movie-detail">
                <img className="movie-poster" src={movie.poster} alt={movie.title} />
                <h1 className="movie-title">{movie.title}</h1>
                <p className="overview">
                    <strong>Overview:</strong> {movie.overview}
                </p>
                <p className="movie-genres">
                    <strong>Genres:</strong> {movie.genres}
                </p>
                <p className="movie-release-date">
                    <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p className="movie-vote-average">
                    <strong>Vote Average:</strong> {movie.vote_average || "Not Rated"}
                </p>
                <p className="budget">
                    <strong>Budget:</strong> {movie.budget}
                </p>
                <div className="movie-buttons">
                    <button className="watch-now">Watch Now</button>
                    <button className="add-to-watchlist">Add to Watchlist</button>
                </div>
            </div>
        </main>
        </>
    );
}

export default MovieDetail;
