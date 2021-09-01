import Blog from "./Blog";

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

export default BlogList;
