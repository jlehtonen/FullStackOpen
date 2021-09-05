import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, { title, author, url }, config);
  return response.data;
};

const like = async blog => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    { ...blog, likes: blog.likes + 1 },
    config
  );
  return response.data;
};

const remove = async blog => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

const exportObject = { getAll, create, like, remove, setToken };

export default exportObject;
