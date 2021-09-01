import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import NewBlogForm from "./components/NewBlogForm";
import LoggedIndicator from "./components/LoggedIndicator";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    const user = await loginService.login(username, password);
    window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
    blogService.setToken(user.token);
    setUser(user);
    setUsername("");
    setPassword("");
  };

  const handleLogout = async => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  const handleNewBlog = async (title, author, url) => {
    console.log(title, author, url);
    const blog = await blogService.create(title, author, url);
    setBlogs([...blogs, blog]);
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
      <LoggedIndicator user={user} handleLogout={handleLogout} />
      <NewBlogForm handleSubmit={handleNewBlog} />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default App;
