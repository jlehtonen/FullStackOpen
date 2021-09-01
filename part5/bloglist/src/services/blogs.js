import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
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

const exportObject = { getAll, create, like, setToken };

export default exportObject;
