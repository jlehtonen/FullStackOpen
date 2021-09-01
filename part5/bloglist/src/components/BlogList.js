import Blog from "./Blog";

const BlogList = ({ blogs, handleLikeClick }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleLikeClick={() => handleLikeClick(blog)} />
      ))}
    </div>
  );
};

export default BlogList;
