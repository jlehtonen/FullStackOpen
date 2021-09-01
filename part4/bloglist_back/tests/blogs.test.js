const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("GET /api/blogs returns correct number of blogs in JSON format", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("each blog returned by GET /api/blogs has an id field", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined();
  });
});

test("POST /api/blogs increases the number of blogs by one", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  await api.post("/api/blogs").send(newBlog);
  expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length + 1);
});

test("likes default to 0 on new blogs if there is no likes field in the POST payload", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };

  await api.post("/api/blogs").send(newBlog);
  const blogsInDb = await helper.blogsInDb();
  const addedBlog = blogsInDb.find(blog => blog.title === newBlog.title);
  expect(addedBlog.likes).toBe(0);
});

test("POST /api/blogs fails with status code 400 if the payload doesn't have a title field", async () => {
  const newBlog = {
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("POST /api/blogs fails with status code 400 if the payload doesn't have a url field", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("Deleting an existing blog causes the number of blogs to decrease by one", async () => {
  const blog = await helper.getBlogByTitle(helper.initialBlogs[0].title);
  await api.delete(`/api/blogs/${blog.id}`);
  expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length - 1);
});

test("Trying to delete a nonexisting blog keeps the number of blogs unchanged", async () => {
  const nonExistingId = await helper.nonExistingId();
  await api.delete(`/api/blogs/${nonExistingId}`);
  expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length);
});

test("Updating likes of a blog works as expected", async () => {
  const blog = await helper.getBlogByTitle(helper.initialBlogs[0].title);
  await api.put(`/api/blogs/${blog.id}`).send({ ...blog, likes: blog.likes + 1 });
  const updatedBlog = await Blog.findById(blog.id);
  expect(updatedBlog.likes).toBe(blog.likes + 1);
});

afterAll(() => {
  mongoose.connection.close();
});