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

  const handleLogin = async event => {
    event.preventDefault();

    const user = await loginService.login(username, password);
    setUser(user);
    setUsername("");
    setPassword("");
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

  return <BlogList blogs={blogs} user={user} />;
};

export default App;
