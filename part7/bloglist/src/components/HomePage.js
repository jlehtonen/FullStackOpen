import { useDispatch } from "react-redux";
import { useRef } from "react";
import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";
import BlogList from "./BlogList";
import { createBlog, likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const HomePage = ({ blogs, user }) => {
  const dispatch = useDispatch();
  const newBlogFormRef = useRef();

  const handleNewBlog = (title, author, url) => {
    newBlogFormRef.current.toggleVisibility();
    dispatch(createBlog(title, author, url));
    dispatch(setNotification(`a new blog ${title} by ${author} added`));
  };

  const handleLikeClick = blog => {
    dispatch(likeBlog(blog));
  };

  const handleBlogDelete = blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
        <NewBlogForm handleSubmit={handleNewBlog} />
      </Togglable>
      <BlogList
        blogs={blogs.sort((a, b) => b.likes - a.likes)}
        handleLikeClick={handleLikeClick}
        loggedUser={user}
        handleDelete={handleBlogDelete}
      />
    </div>
  );
};

export default HomePage;
