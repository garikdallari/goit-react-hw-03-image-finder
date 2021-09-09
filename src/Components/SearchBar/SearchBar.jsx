import React from "react";

function SearchBar({ onSubmit }) {
  const handleSearch = (e) => {
    e.preventDefault();
    onSubmit(e.target.elements.searchValue.value);
  };
  return (
    <header className="Searchbar">
      <form onSubmit={handleSearch} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          name="searchValue"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default SearchBar;
