import { callPostToBooks, callGetBooks } from "../api/books";

export const beginAddBook = (book = {}) => {
  return dispatch => {
    return callPostToBooks(book).then(({ data }) => dispatch(addBook(data)));
  };
};

export const addBook = book => ({
  type: "ADD_BOOK",
  book
});

export const beginSetBooks = () => {
  return dispatch => {
    return callGetBooks().then(({ data }) => dispatch(setBooks(data)));
  };
};
export const setBooks = books => ({
  type: "SET_BOOKS",
  books
});
