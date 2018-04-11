const booksReducerDefaultState = [];

export default (state = booksReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.book];
    case "DELETE_BOOK":
      return state.filter(({ _id }) => _id !== action._id);
    case "EDIT_BOOK":
      return state.map(book => {
        if (book._id === action._id) {
          return {
            ...book,
            shelfStatus: action.shelfStatus
          };
        }
        return book;
      });
    case "SET_BOOKS":
      return action.books;
    default:
      return state;
  }
};
