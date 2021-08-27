import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then(({ data }) => data);

const create = newPerson => axios.post(baseUrl, newPerson).then(({ data }) => data);

const exportObject = {
  getAll,
  create,
};

export default exportObject;
