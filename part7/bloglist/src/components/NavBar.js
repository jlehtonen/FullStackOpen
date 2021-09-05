import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import Button from "./Button";

const Link = styled(RouterLink)`
  color: white;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;

  :hover {
    background-color: #581780;
  }
`;

const Container = styled.header`
  background-color: #6a1b9a;
  height: 3rem;
  display: flex;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const Content = styled.div`
  width: 50%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1.8fr;
  align-items: center;
`;

const LogoLink = styled(RouterLink)`
  text-decoration: none;
`;

const Logo = styled.h1`
  color: white;
  font-size: 1.5rem;
`;

const Navigation = styled.nav`
  color: white;
  justify-self: end;
  height: 100%;
  display: flex;
`;

const NavLinkList = styled.ul`
  list-style: none;
  display: flex;
  height: 100%;
`;

const LoginIndicator = styled.div`
  color: white;
  justify-self: end;
  display: flex;

  *:not(:first-child) {
    margin-left: 1.5rem;
  }

  & :first-child {
    font-size: 0.9rem;
    align-self: center;
  }
`;

const NavBar = ({ user, handleLogout }) => {
  return (
    <Container>
      <Content>
        <LogoLink to="/">
          <Logo>Blog app</Logo>
        </LogoLink>
        <Navigation>
          <NavLinkList>
            <li>
              <Link to="/">Blogs</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </NavLinkList>
        </Navigation>
        <LoginIndicator>
          <span>{user.name} logged in</span>
          <Button secondary small onClick={handleLogout}>
            Log out
          </Button>
        </LoginIndicator>
      </Content>
    </Container>
  );
};

export default NavBar;
