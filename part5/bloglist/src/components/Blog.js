import { useState } from "react";

const Blog = ({ blog, handleLikeClick }) => {
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
      <div style={styles}>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setIsExpanded(true)}>view</button>
      </div>
    );
  }

  return (
    <div style={styles}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setIsExpanded(false)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={handleLikeClick}>like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  );
};

export default Blog;
