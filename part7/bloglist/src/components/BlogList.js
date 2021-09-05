import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;
