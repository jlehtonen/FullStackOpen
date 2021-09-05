import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.li``;

const Link = styled(RouterLink)`
  display: block;
  text-decoration: none;
  padding: 0.7rem 1rem;
  color: #6a1b9a;

  :hover {
    text-decoration: underline;
  }

  :active {
    text-decoration-color: #6a1b9a;
  }
`;

const Title = styled.div`
  color: #6a1b9a;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Author = styled.div`
  color: #a386b5;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Blog = ({ blog }) => {
  return (
    <Container className="blog">
      <Link to={`/blogs/${blog.id}`}>
        <Title>{blog.title}</Title>
        <Author>{blog.author}</Author>
      </Link>
    </Container>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
