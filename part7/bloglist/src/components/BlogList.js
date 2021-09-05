import Blog from "./Blog";
import PropTypes from "prop-types";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  margin-bottom: 3rem;

  > *:nth-child(odd) {
    background-color: #faf2ff;
  }

  > :first-child {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }

  > :last-child {
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
`;

const BlogList = ({ blogs }) => {
  return (
    <List>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </List>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;
