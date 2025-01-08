import React, { useState } from "react";
import { searchTracks, login } from "../../spotify";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResult] = useState([]);
  const [searchType, serSearchType] = useState("track");

  const handleSearch = async () => {
    const data = await searchTracks(query, searchType);
    setResult(data.tracks.items);
  };
  return (
    <section>
      <h1 className="card-title">Tu cancion, Artista o album</h1>
      <button onClick={login}>Iniciar Sesion con Spotify</button>
    </section>
  );
};

export default SearchBar;
