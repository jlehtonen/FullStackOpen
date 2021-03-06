import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { logout } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import UsersPage from "./components/UsersPage";
import UserPage from "./components/UserPage";
import HomePage from "./components/HomePage";
import BlogPage from "./components/BlogPage";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import NavBar from "./components/NavBar";

const Container = styled.div`
  width: 50%;
  margin: 6rem auto 0;
`;

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.users);
  const loggedUser = useSelector(state => state.user);

  const userMatch = useRouteMatch("/users/:id");
  const user = userMatch ? users.find(user => user.id === userMatch.params.id) : null;

  const blogMatch = useRouteMatch("/blogs/:id");
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null;

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loggedUser === null) {
    return <LoginForm />;
  }

  return (
    <>
      <NavBar user={loggedUser} handleLogout={handleLogout} />
      <Container>
        <Notification />
        <Switch>
          <Route path="/users/:id">
            <UserPage user={user} />
          </Route>
          <Route path="/users">
            <UsersPage />
          </Route>
          <Route path="/blogs/:id">
            <BlogPage blog={blog} loggedUser={loggedUser} />
          </Route>
          <Route>
            <HomePage blogs={blogs} />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
