import { Link } from "react-router-dom";

function MovieCard({ title, id, poster }) {
    return (
        <Link to={`/movies/${id}`} className="movieCard">
            <article>
                <img src={poster} alt={`${title} Poster`} />
                <h2>{title}</h2>
            </article>
        </Link>  
    );
}

export default MovieCard;
