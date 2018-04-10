import React from "react";
import axios from "axios";

import SearchInput from "./SearchInput";
import BooksContainer from "../Books/BooksContainer";

import { callGoogleBooks } from "../../api/external";

export default class BookSearch extends React.Component {
  state = { query: "", field: "intitle", data: [], loading: false };

  loadData = async () => {
    this.setState(() => ({ loading: true }));
    try {
      const response = await callGoogleBooks(
        this.state.query,
        this.state.field
      );
      const data = response.data
        .map(book => {
          const volumeID = book.id;
          const identifiers = book.volumeInfo.industryIdentifiers || [];
          const title = book.volumeInfo.title || "";
          const subtitle = book.volumeInfo.subtitle || "";
          const authors = book.volumeInfo.authors || [];
          const description = book.volumeInfo.description || "";
          const pageCount = book.volumeInfo.pageCount || null;
          const hasThumbnail = book.volumeInfo.imageLinks || null;
          let thumbnailLink;
          hasThumbnail
            ? (thumbnailLink = book.volumeInfo.imageLinks.thumbnail)
            : (thumbnailLink = "");
          return {
            volumeID,
            identifiers,
            title,
            subtitle,
            authors,
            description,
            pageCount,
            thumbnailLink
          };
        })
        .filter(book => book.thumbnailLink !== "");
      this.setState(() => ({ data, loading: false }));
    } catch (e) {
      console.log(e);
      // SET ERROR TO READ NO BOOKS AND CLEAR BOOK DATA STATE
    }
  };

  onQueryChange = e => {
    const query = e.target.value;
    this.setState({ query });
  };

  onFieldChange = e => {
    const field = e.target.value;
    this.setState({ field });
  };

  submitForm = e => {
    e.preventDefault();
    this.loadData();
  };

  render() {
    return (
      <section className="search">
        <SearchInput
          query={this.state.query}
          field={this.state.field}
          onQueryChange={this.onQueryChange}
          onFieldChange={this.onFieldChange}
          submitForm={this.submitForm}
        />
        <BooksContainer
          books={this.state.data}
          loading={this.state.loading}
          perPage={12}
          bunched
        />
      </section>
    );
  }
}
