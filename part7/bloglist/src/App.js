import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { login, logout } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { Switch, Route } from "react-router-dom";

import UsersPage from "./components/UsersPage";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import LoggedIndicator from "./components/LoggedIndicator";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const handleLogout = () => {
    dispatch(logout());
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
      <Switch>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route>
          <HomePage blogs={blogs} user={user} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
