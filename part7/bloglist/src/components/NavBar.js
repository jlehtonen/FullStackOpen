import { Link } from "react-router-dom";

const NavBar = ({ user, handleLogout }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", backgroundColor: "lightgrey" }}
    >
      <ul style={{ listStyle: "none", display: "flex" }}>
        <li style={{ marginRight: 10 }}>
          <Link to="/">Blogs</Link>
        </li>
        <li style={{ marginRight: 10 }}>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <span style={{ marginRight: 10 }}>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default NavBar;
