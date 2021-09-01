const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

const getTokenFrom = req => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.post("/", async (req, res) => {
  const token = getTokenFrom(req);
  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(decodedToken.id);

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
  if (blog) {
    await blog.remove();
  }
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
