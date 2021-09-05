import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ blogs, handleLikeClick, loggedUser, handleDelete }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={() => handleLikeClick(blog)}
          loggedUser={loggedUser}
          handleDelete={() => handleDelete(blog)}
        />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  loggedUser: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default BlogList;
