import React from "react";
import axios from "axios";

import SearchInput from "./SearchInput";
import BooksContainer from "./BooksContainer";

import { callGoogleBooks } from "../../api/external";

export default class BookSearch extends React.Component {
  state = { query: "", field: "intitle", data: [], page: 0, perPage: 12 };

  loadData = async () => {
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
      this.setState(() => ({ data, page: 1 }));
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

  divideData = data => {
    const indexLast = this.state.page * this.state.perPage;
    const indexFirst = indexLast - this.state.perPage;
    return data.slice(indexFirst, indexLast);
  };
  paginateBackward = () => {
    if (this.state.page <= 1) {
      this.setState(() => ({ page: 1 }));
    } else {
      this.setState(prevState => ({
        page: prevState.page - 1
      }));
    }
  };
  paginateForward = () => {
    if (this.state.page >= 3) {
      this.setState(() => ({ page: 3 }));
    } else {
      this.setState(prevState => ({
        page: prevState.page + 1
      }));
    }
  };
  hidePaginateBackward = () => (this.state.page === 1 ? "u-hide" : "");
  hidePaginateForward = () => {
    if (
      this.divideData(this.state.data).length < this.state.perPage ||
      this.state.page === 3
    ) {
      return "u-hide";
    }
    return "";
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
          divideBooks={this.divideData}
          forward={this.paginateForward}
          backward={this.paginateBackward}
          hideForward={this.hidePaginateForward}
          hideBackward={this.hidePaginateBackward}
          page={this.state.page}
        />
      </section>
    );
  }
}
