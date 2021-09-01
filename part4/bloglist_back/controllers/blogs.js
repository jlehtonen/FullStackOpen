const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!req.body.hasOwnProperty("title") || !req.body.hasOwnProperty("url")) {
    return res.status(400).end();
  }

  const blog = new Blog({ likes: 0, ...req.body, user: user._id });
  const savedBlog = await blog.save();
  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(204).end();
  }

  const user = req.user;
  if (!user || blog.user.toString() !== user._id.toString()) {
    return res.status(401).end();
  }

  await blog.remove();
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
  res.json(updatedBlog);
});

module.exports = blogsRouter;
