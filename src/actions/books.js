import {
  callPostToBooks,
  callGetBooks,
  callDeleteFromBooks
} from "../api/books";

export const beginAddBook = (book = {}) => {
  return dispatch => {
    return callPostToBooks(book).then(({ data }) => dispatch(addBook(data)));
  };
};

export const addBook = book => ({
  type: "ADD_BOOK",
  book
});

export const beginDeleteBook = book => {
  return dispatch => {
    return callDeleteFromBooks(book).then(({ data }) =>
      dispatch(deleteBook(data))
    );
  };
};

export const deleteBook = ({ _id }) => ({
  type: "DELETE_BOOK",
  _id
});

export const beginSetBooks = token => {
  return dispatch => {
    return callGetBooks(token).then(({ data }) => dispatch(setBooks(data)));
  };
};
export const setBooks = books => ({
  type: "SET_BOOKS",
  books
});
