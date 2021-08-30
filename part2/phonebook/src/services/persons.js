import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => axios.get(baseUrl).then(({ data }) => data);

const create = newPerson => axios.post(baseUrl, newPerson).then(({ data }) => data);

const remove = id => axios.delete(`${baseUrl}/${id}`);

const update = newPerson =>
  axios.put(`${baseUrl}/${newPerson.id}`, newPerson).then(({ data }) => data);

const exportObject = {
  getAll,
  create,
  remove,
  update,
};

export default exportObject;
