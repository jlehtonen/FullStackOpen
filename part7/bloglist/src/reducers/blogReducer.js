import blogService from "../services/blogs";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    default:
      return state;
  }
};

export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll();
  return dispatch({
    type: "SET_BLOGS",
    data: blogs,
  });
};

export const createBlog = (title, author, url) => async dispatch => {
  const blog = await blogService.create(title, author, url);
  return dispatch({
    type: "ADD_BLOG",
    data: blog,
  });
};

export default reducer;
