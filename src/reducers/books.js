const booksReducerDefaultState = [];

export default (state = booksReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.book];
    case "SET_BOOKS":
      return action.books;
    default:
      return state;
  }
};
