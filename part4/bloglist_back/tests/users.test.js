const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

describe("POST /api/users fails", () => {
  test("if username doesn't exist", async () => {
    const user = { name: "User", password: "password" };
    const response = await api.post("/api/users").send(user).expect(400);
    const allUsers = await User.find({});
    expect(allUsers).toHaveLength(0);
    expect(response.text).toContain("`username` is required");
  });

  test("if username is too short", async () => {
    const user = { username: "u", name: "User", password: "password" };
    const response = await api.post("/api/users").send(user).expect(400);
    const allUsers = await User.find({});
    expect(allUsers).toHaveLength(0);
    expect(response.text).toContain("validation failed: username");
    expect(response.text).toContain("shorter than the minimum allowed length");
  });

  test("if username isn't unique", async () => {
    const user = { username: "username", name: "User", password: "password" };
    await api.post("/api/users").send(user);
    const response = await api.post("/api/users").send(user).expect(400);
    const allUsers = await User.find({});
    expect(allUsers).toHaveLength(1);
    expect(response.text).toContain("validation failed: username");
    expect(response.text).toContain("`username` to be unique");
  });

  test("if password doesn't exist", async () => {
    const user = { username: "username", name: "User" };
    const response = await api.post("/api/users").send(user).expect(400);
    const allUsers = await User.find({});
    expect(allUsers).toHaveLength(0);
    expect(response.text).toContain("password must be at least 3 characters long");
  });

  test("if password is too short", async () => {
    const user = { username: "username", name: "User", password: "p" };
    const response = await api.post("/api/users").send(user).expect(400);
    const allUsers = await User.find({});
    expect(allUsers).toHaveLength(0);
    expect(response.text).toContain("password must be at least 3 characters long");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
