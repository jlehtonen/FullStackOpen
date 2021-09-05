import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { login, logout } from "./reducers/userReducer";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoggedIndicator from "./components/LoggedIndicator";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const newBlogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

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

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoggedIndicator user={user} handleLogout={handleLogout} />
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

export default App;
