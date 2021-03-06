import userService from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS":
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => async dispatch => {
  const users = await userService.getAll();
  return dispatch({
    type: "SET_USERS",
    data: users,
  });
};

export default reducer;
