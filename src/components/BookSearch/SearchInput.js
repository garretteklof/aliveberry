import React from "react";

const SearchInput = ({
  query,
  field,
  onFieldChange,
  onQueryChange,
  submitForm
}) => (
  <form className="search__form" onSubmit={submitForm}>
    <input
      className="search__input"
      type="text"
      placeholder="search books"
      onChange={onQueryChange}
      value={query}
      autoFocus
    />
    <label htmlFor="search" name="search" className="search__label">
      <svg>
        <use xlinkHref="/images/sprite.svg#icon-search" />
      </svg>
      <svg>
        <use xlinkHref="/images/sprite.svg#icon-google" />
      </svg>
      <svg>
        <use xlinkHref="/images/sprite.svg#icon-books" />
      </svg>
    </label>
    <select className="search__select" value={field} onChange={onFieldChange}>
      <option value="intitle">Title</option>
      <option value="inauthor">Author</option>
      <option value="isbn">ISBN</option>
    </select>
  </form>
);

export default SearchInput;
