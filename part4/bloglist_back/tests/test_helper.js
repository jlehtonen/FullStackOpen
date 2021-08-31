const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const getBlogByTitle = async title => {
  const blog = await Blog.findOne({ title });
  return blog.toJSON();
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Nonexisting blog",
    author: "John Doe",
    url: "http://nonexistingblog.com",
  });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  getBlogByTitle,
  nonExistingId,
};
