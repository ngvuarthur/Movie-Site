import { useEffect, useState } from "react";
import "../../styles/Home.css";
import MovieCard from "../MovieCard";
import NavBar from "../NavBar";

export default function Towatchlist() {
  const apiKey = "799192d9679d0874b75cbbd24b48649a987b381dba5eee41cdeec672ba4410ae";

  const [watchmovies, setWatchmovies] = useState([]);

  useEffect(() => {
    const fetchwatchmovie = async () => {
      try {
        const response = await fetch(
          "https://loki.trentu.ca/~shubarnasunuwar/3430/assn/assign2/api/towatchlist/entries",
          {
            headers: {
              "X-API-KEY": apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        setWatchmovies(jsonResponse);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchwatchmovie();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>To Watch List</h1>
      <div className="movie-list">
        {watchmovies.length > 0 ? (
          watchmovies.map((movie, index) => (
            <MovieCard
            key={movie.movie_id}
            id={movie.movie_id}
            title={movie.title}
            poster={movie.poster}
        /> 
          ))
        ) : (
          <p>No movies in your watch list yet!</p>
        )}
      </div>
    </div>
  );
}
