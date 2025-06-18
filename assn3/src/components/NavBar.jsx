import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import Searchbar from "./Searchbar";

function NavBar({ searchMovie }) {
  const navigate = useNavigate();

  return (
    <nav className="NavBar">
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/to-watch">To-watch</NavLink>
        <NavLink to="/completed">Completed</NavLink>
      </div>
      <div className="nav-search">
        <Searchbar searchMovie={searchMovie} />
      </div>
    </nav>
  );
}

export default NavBar;