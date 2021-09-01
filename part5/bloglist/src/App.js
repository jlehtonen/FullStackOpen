import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoggedIndicator from "./components/LoggedIndicator";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const newBlogFormRef = useRef();

  const showNotification = (message, type = "success") => {
    setNotificationType(type);
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
      setNotificationType(null);
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      showNotification("wrong username or password", "error");
    }
  };

  const handleLogout = async => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  const handleNewBlog = async (title, author, url) => {
    newBlogFormRef.current.toggleVisibility();
    const blog = await blogService.create(title, author, url);
    setBlogs([...blogs, blog]);
    showNotification(`a new blog ${blog.title} by ${blog.author} added`);
  };

  const handleLikeClick = async blog => {
    const likedBlog = await blogService.like(blog);
    setBlogs(
      blogs.map(blog =>
        blog.id === likedBlog.id ? { ...blog, likes: likedBlog.likes } : blog
      )
    );
  };

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        notification={notification}
        notificationType={notificationType}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} type={notificationType} />
      <LoggedIndicator user={user} handleLogout={handleLogout} />
      <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
        <NewBlogForm handleSubmit={handleNewBlog} />
      </Togglable>
      <BlogList blogs={blogs} handleLikeClick={handleLikeClick} />
    </div>
  );
};

export default App;
