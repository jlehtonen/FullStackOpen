import blogService from "../services/blogs";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "UPDATE_BLOG_LIKES":
      return state.map(blog =>
        blog.id !== action.data.id ? blog : { ...blog, likes: action.data.likes }
      );
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.data.id);
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

export const likeBlog = blog => async dispatch => {
  const updatedBlog = await blogService.like(blog);
  return dispatch({
    type: "UPDATE_BLOG_LIKES",
    data: { id: updatedBlog.id, likes: updatedBlog.likes },
  });
};

export const deleteBlog = blog => async dispatch => {
  await blogService.remove(blog);
  return dispatch({
    type: "DELETE_BLOG",
    data: { id: blog.id },
  });
};

export default reducer;
