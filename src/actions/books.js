import { callPostBooks } from "../api/books";

export const addBook = book => ({
  type: "ADD_BOOK",
  book
});

export const beginAddBook = (book = {}) => {
  return dispatch => {
    return callPostBooks(book).then(
      book => dispatch(addBook(book)),
      e => console.log(e)
    );
  };
};
