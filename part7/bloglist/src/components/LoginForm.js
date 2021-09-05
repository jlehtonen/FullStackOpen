import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import Notification from "./Notification";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async event => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form id="login-form" onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
