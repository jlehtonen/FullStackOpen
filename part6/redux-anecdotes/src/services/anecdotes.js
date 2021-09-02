import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async content => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async anecdote => {
  const object = { content: anecdote.content, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, object);
  return response.data;
};

const exportObject = { getAll, create, vote };

export default exportObject;
