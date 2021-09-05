import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
