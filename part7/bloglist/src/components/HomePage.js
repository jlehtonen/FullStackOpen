import { useDispatch } from "react-redux";
import { useRef } from "react";
import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";
import BlogList from "./BlogList";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const HomePage = ({ blogs }) => {
  const dispatch = useDispatch();
  const newBlogFormRef = useRef();

  const handleNewBlog = (title, author, url) => {
    newBlogFormRef.current.toggleVisibility();
    dispatch(createBlog(title, author, url));
    dispatch(setNotification(`a new blog ${title} by ${author} added`));
  };

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
        <NewBlogForm handleSubmit={handleNewBlog} />
      </Togglable>
      <BlogList blogs={blogs.sort((a, b) => b.likes - a.likes)} />
    </div>
  );
};

export default HomePage;
