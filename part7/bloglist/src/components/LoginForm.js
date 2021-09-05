import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login } from "../reducers/userReducer";
import Notification from "./Notification";
import Field, { useField } from "./Field";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  width: 270px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, resetUsername] = useField("text");
  const [password, resetPassword] = useField("password");

  const handleLogin = async event => {
    event.preventDefault();
    dispatch(login(username.value, password.value));
    resetUsername();
    resetPassword();
  };

  return (
    <Container>
      <FormContainer>
        <Title>Log in to the Blog app</Title>
        <Notification />
        <form onSubmit={handleLogin} id="login-form">
          <Field label="Username" id="username" {...username} />
          <Field label="Password" id="password" {...password} />
          <Button fullwidth id="login-button">
            Log in
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
