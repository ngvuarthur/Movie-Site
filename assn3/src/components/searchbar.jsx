import { useState } from "react";

export default function Searchbar({ searchMovie }) {
  const [title, setTitle] = useState("");

  function titleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload on form submission
    searchMovie(title);  // Update the search query
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Search title"
        onChange={titleChange}
      />
      <button type="submit">Search</button>
      <Link to="./movies/:id"/>
    </form>
  );
}