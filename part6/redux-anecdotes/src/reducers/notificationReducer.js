const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;
    case "UNSET_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const setNotification = notification => {
  return {
    type: "SET_NOTIFICATION",
    data: { notification },
  };
};

export const unsetNotification = () => {
  return {
    type: "UNSET_NOTIFICATION",
  };
};

export default reducer;
