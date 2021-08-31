const dummy = blogs => 1;

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = blogs => {
  const blog = blogs.reduce((favorite, b) => (b.likes > favorite.likes ? b : favorite));
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = blogs => {
  const blogCounts = {};
  blogs.forEach(blog => {
    const numBlogs = blogCounts[blog.author];
    blogCounts[blog.author] = numBlogs !== undefined ? numBlogs + 1 : 1;
  });

  return Object.entries(blogCounts).reduce(
    (authorWithMostBlogs, [authorName, blogCount]) => {
      if (blogCount > authorWithMostBlogs.blogs) {
        return { author: authorName, blogs: blogCount };
      } else {
        return authorWithMostBlogs;
      }
    },
    { blogs: 0 }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
