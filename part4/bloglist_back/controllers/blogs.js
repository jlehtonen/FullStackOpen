const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  if (!req.body.hasOwnProperty("title") || !req.body.hasOwnProperty("url")) {
    return res.status(400).end();
  }

  const blog = new Blog({ likes: 0, ...req.body });
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    await blog.remove();
  }
  res.status(204).end();
});

module.exports = blogsRouter;
