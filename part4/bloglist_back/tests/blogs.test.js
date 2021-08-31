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

afterAll(() => {
  mongoose.connection.close();
});
