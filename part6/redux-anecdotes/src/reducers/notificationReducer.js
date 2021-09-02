const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;
    default:
      return state;
  }
};

export const setNotification = (notification, time) => async dispatch => {
  setTimeout(() => {
    dispatch({ type: "SET_NOTIFICATION", data: { notification: "" } });
  }, time * 1000);

  return dispatch({
    type: "SET_NOTIFICATION",
    data: { notification },
  });
};

export default reducer;
