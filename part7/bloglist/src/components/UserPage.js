import styled from "styled-components";
import BlogList from "./BlogList";

const Title = styled.h2`
  color: #444;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h3`
  color: #444;
  margin-bottom: 1rem;
`;

const UserPage = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <Title>{user.name}</Title>
      <Subtitle>Added blogs</Subtitle>
      <BlogList blogs={user.blogs} />
    </div>
  );
};

export default UserPage;
