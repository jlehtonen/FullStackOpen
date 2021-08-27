import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then(({ data }) => data);

const create = newPerson => axios.post(baseUrl, newPerson).then(({ data }) => data);

const remove = id => axios.delete(`${baseUrl}/${id}`);

const exportObject = {
  getAll,
  create,
  remove,
};

export default exportObject;
