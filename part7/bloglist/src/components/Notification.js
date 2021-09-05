import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  padding: 0.7rem;
  border: 2px solid ${({ error }) => (error ? "#b50e0e" : "#136600")};
  color: ${({ error }) => (error ? "#b50e0e" : "#136600")};
  border-radius: 0.3rem;
  background-color: ${({ error }) => (error ? "#ffe8e8" : "#d6ffcc")};
  margin-bottom: 1rem;
`;

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (!notification.message) {
    return null;
  }

  return (
    <Container error={notification.type === "error"}>{notification.message}</Container>
  );
};

export default Notification;
