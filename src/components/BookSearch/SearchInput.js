import React from "react";

const SearchInput = ({
  query,
  field,
  onFieldChange,
  onQueryChange,
  loadData
}) => (
  <form className="search__form" onSubmit={loadData}>
    <input
      className="search__input"
      type="text"
      placeholder="find book"
      onChange={onQueryChange}
      value={query}
    />
    <select className="search__select" value={field} onChange={onFieldChange}>
      <option value="intitle">Title</option>
      <option value="inauthor">Author</option>
      <option value="isbn">ISBN</option>
    </select>
  </form>
);

export default SearchInput;
