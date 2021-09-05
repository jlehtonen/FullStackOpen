const initialState = { message: "", type: "success" };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { message: action.data.message, type: action.data.type };
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

let timerId = null;

export const setNotification =
  (message, type = "success") =>
  async dispatch => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);

    return dispatch({
      type: "SET_NOTIFICATION",
      data: { message, type },
    });
  };

export default reducer;
