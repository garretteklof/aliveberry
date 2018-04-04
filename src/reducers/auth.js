export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        _id: action._id
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
