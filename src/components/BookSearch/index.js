import React from "react";
import axios from "axios";
import MediaQuery from "react-responsive";

import SearchInput from "./SearchInput";
import BooksContainer from "../Books/BooksContainer";

import { callGoogleBooks } from "../../api/external";

export default class BookSearch extends React.Component {
  state = { query: "", field: "intitle", data: [], loading: false, error: "" };

  loadData = async () => {
    this.setState(() => ({ loading: true, data: [], error: "" }));
    try {
      const response = await callGoogleBooks(
        this.state.query,
        this.state.field
      );
      if (response.data) {
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
              ? (thumbnailLink = book.volumeInfo.imageLinks.thumbnail.replace(
                  /^http:\/\//i,
                  "https://"
                ))
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
          .filter(
            book =>
              book.thumbnailLink !== "" &&
              book.authors.length !== 0 &&
              book.title.length !== 0
          );
        data.length
          ? this.setState(() => ({
              data,
              loading: false
            }))
          : this.setState(() => ({
              loading: false,
              error: "🙅 No matches! 🙅"
            }));
      } else {
        this.setState(() => ({
          loading: false,
          error: "🙅 No matches! 🙅"
        }));
      }
    } catch (e) {
      this.setState(() => ({
        loading: false,
        error: "There was an error connecting to Google Books."
      }));
    }
  };

  onQueryChange = e => {
    const query = e.target.value;
    this.setState({ query, error: "" });
  };

  onFieldChange = e => {
    const field = e.target.value;
    this.setState({ field, error: "" });
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

        <MediaQuery maxWidth={"56.25em"}>
          {matches => {
            if (matches) {
              return (
                <MediaQuery maxWidth={"50em"}>
                  {matches => {
                    if (matches) {
                      return (
                        <MediaQuery maxWidth={"43.75em"}>
                          {matches => {
                            if (matches) {
                              return (
                                <MediaQuery maxWidth={"28.125em"}>
                                  {matches => {
                                    if (matches) {
                                      return (
                                        <BooksContainer
                                          books={this.state.data}
                                          loading={this.state.loading}
                                          error={this.state.error}
                                          perPage={3}
                                          bunched
                                          forSearch
                                        />
                                      );
                                    } else {
                                      return (
                                        <BooksContainer
                                          books={this.state.data}
                                          loading={this.state.loading}
                                          error={this.state.error}
                                          perPage={4}
                                          bunched
                                          forSearch
                                        />
                                      );
                                    }
                                  }}
                                </MediaQuery>
                              );
                            } else {
                              return (
                                <BooksContainer
                                  books={this.state.data}
                                  loading={this.state.loading}
                                  error={this.state.error}
                                  perPage={6}
                                  bunched
                                  forSearch
                                />
                              );
                            }
                          }}
                        </MediaQuery>
                      );
                    } else {
                      return (
                        <BooksContainer
                          books={this.state.data}
                          loading={this.state.loading}
                          error={this.state.error}
                          perPage={10}
                          bunched
                          forSearch
                        />
                      );
                    }
                  }}
                </MediaQuery>
              );
            } else {
              return (
                <BooksContainer
                  books={this.state.data}
                  loading={this.state.loading}
                  error={this.state.error}
                  perPage={12}
                  bunched
                  forSearch
                />
              );
            }
          }}
        </MediaQuery>
      </section>
    );
  }
}
