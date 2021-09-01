import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLikeClick, loggedUser, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const styles = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!isExpanded) {
    return (
      <div style={styles} className="blog">
        {blog.title} {blog.author}{" "}
        <button onClick={() => setIsExpanded(true)}>view</button>
      </div>
    );
  }

  return (
    <div style={styles} className="blog">
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setIsExpanded(false)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes <span id="like-count">{blog.likes}</span>{" "}
        <button onClick={handleLikeClick}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {blog.user.username === loggedUser.username && (
        <button onClick={handleDelete}>remove</button>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
