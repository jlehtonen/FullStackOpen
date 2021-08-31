require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs);
  });
});

app.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then(result => {
    res.status(201).json(result);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
