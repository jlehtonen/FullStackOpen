import { useDispatch } from "react-redux";
import { likeBlog, addComment } from "../reducers/blogReducer";

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleNewComment = event => {
    event.preventDefault();
    dispatch(addComment(blog.id, event.target.comment.value));
    event.target.comment.value = "";
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
      <form onSubmit={handleNewComment}>
        <input type="text" name="comment" />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
