import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";

import BooksContainer from "../Books/BooksContainer";
import ScrollNotification from "./ScrollNotification";

const AllShelves = ({ rBooks, wtrBooks, crBooks }) => (
  <div className="all">
    <ScrollNotification />
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
                              books={rBooks}
                              shelf={"Read"}
                              perPage={3}
                              bunched
                            />
                          );
                        } else {
                          return (
                            <BooksContainer
                              books={rBooks}
                              shelf={"Read"}
                              perPage={4}
                              bunched
                            />
                          );
                        }
                      }}
                    </MediaQuery>
                  );
                } else {
                  return (
                    <BooksContainer
                      books={rBooks}
                      shelf={"Read"}
                      perPage={6}
                      bunched
                    />
                  );
                }
              }}
            </MediaQuery>
          );
        } else {
          return (
            <BooksContainer books={rBooks} shelf={"Read"} perPage={8} bunched />
          );
        }
      }}
    </MediaQuery>

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
                              books={wtrBooks}
                              shelf={"Want to Read"}
                              perPage={3}
                              bunched
                            />
                          );
                        } else {
                          return (
                            <BooksContainer
                              books={wtrBooks}
                              shelf={"Want to Read"}
                              perPage={4}
                              bunched
                            />
                          );
                        }
                      }}
                    </MediaQuery>
                  );
                } else {
                  return (
                    <BooksContainer
                      books={wtrBooks}
                      shelf={"Want to Read"}
                      perPage={6}
                      bunched
                    />
                  );
                }
              }}
            </MediaQuery>
          );
        } else {
          return (
            <BooksContainer
              books={wtrBooks}
              shelf={"Want to Read"}
              perPage={8}
              bunched
            />
          );
        }
      }}
    </MediaQuery>

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
                              books={crBooks}
                              shelf={"Currently Reading"}
                              perPage={3}
                              bunched
                            />
                          );
                        } else {
                          return (
                            <BooksContainer
                              books={crBooks}
                              shelf={"Currently Reading"}
                              perPage={4}
                              bunched
                            />
                          );
                        }
                      }}
                    </MediaQuery>
                  );
                } else {
                  return (
                    <BooksContainer
                      books={crBooks}
                      shelf={"Currently Reading"}
                      perPage={6}
                      bunched
                    />
                  );
                }
              }}
            </MediaQuery>
          );
        } else {
          return (
            <BooksContainer
              books={crBooks}
              shelf={"Currently Reading"}
              perPage={8}
              bunched
            />
          );
        }
      }}
    </MediaQuery>
  </div>
);

const mapStateToProps = state => ({
  rBooks: state.books.filter(({ shelfStatus }) => shelfStatus === "Read"),
  wtrBooks: state.books.filter(
    ({ shelfStatus }) => shelfStatus === "Want to Read"
  ),
  crBooks: state.books.filter(
    ({ shelfStatus }) => shelfStatus === "Currently Reading"
  )
});

export default connect(mapStateToProps)(AllShelves);
