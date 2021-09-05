import axios from "axios";
const url = blogId => `/api/blogs/${blogId}/comments`;

const create = async (blogId, comment) => {
  const response = await axios.post(url(blogId), { comment });
  return response.data;
};

const exportObject = { create };

export default exportObject;
