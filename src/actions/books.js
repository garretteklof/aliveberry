import {
  callGetBooks,
  callPostToBooks,
  callPatchToBooks,
  callDeleteFromBooks
} from "../api/books";

export const beginAddBook = (book = {}) => {
  return dispatch => {
    return callPostToBooks(book).then(({ data }) => dispatch(addBook(data)));
  };
};

const addBook = book => ({
  type: "ADD_BOOK",
  book
});

export const beginEditBook = book => {
  return dispatch => {
    return callPatchToBooks(book).then(({ data }) => dispatch(editBook(data)));
  };
};

const editBook = ({ _id, shelfStatus }) => ({
  type: "EDIT_BOOK",
  _id,
  shelfStatus
});

export const beginDeleteBook = book => {
  return dispatch => {
    return callDeleteFromBooks(book).then(({ data }) =>
      dispatch(deleteBook(data))
    );
  };
};

const deleteBook = ({ _id }) => ({
  type: "DELETE_BOOK",
  _id
});

export const beginSetBooks = () => {
  return dispatch => {
    return callGetBooks().then(({ data }) => dispatch(setBooks(data)));
  };
};

const setBooks = books => ({
  type: "SET_BOOKS",
  books
});
