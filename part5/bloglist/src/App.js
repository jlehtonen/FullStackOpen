import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
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
    setUser(user);
    setUsername("");
    setPassword("");
  };

  const handleLogout = async => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
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

  return <BlogList blogs={blogs} user={user} handleLogout={handleLogout} />;
};

export default App;
