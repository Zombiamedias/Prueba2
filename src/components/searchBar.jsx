import React from "react";
const SearchBar = () => {
  return (
    <section>
      <label htmlFor="formControlInput" className="form-label">
        type your artist, name song, genre
      </label>
      <input
        type="text"
        className="form-control"
        id="formControlInput"
        placeholder="name, title, album"
      />
    </section>
  );
};

export default SearchBar;
