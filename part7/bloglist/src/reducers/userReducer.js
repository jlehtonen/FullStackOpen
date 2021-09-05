import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const getLoggedUser = () => {
  const loggedUserString = window.localStorage.getItem("loggedBloglistUser");
  if (!loggedUserString) {
    return null;
  }

  const loggedUser = JSON.parse(loggedUserString);
  blogService.setToken(loggedUser.token);
  return loggedUser;
};

const reducer = (state = getLoggedUser(), action) => {
  switch (action.type) {
    case "SET_LOGGED_USER":
      return action.data;
    case "LOG_OUT":
      return null;
    default:
      return state;
  }
};

export const login = (username, password) => async dispatch => {
  try {
    const user = await loginService.login(username, password);
    window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
    blogService.setToken(user.token);
    return dispatch({
      type: "SET_LOGGED_USER",
      data: user,
    });
  } catch (exception) {
    dispatch(setNotification("Wrong username or password", "error"));
  }
};

export const logout = () => async dispatch => {
  window.localStorage.removeItem("loggedBloglistUser");
  return dispatch({
    type: "LOG_OUT",
  });
};

export default reducer;
