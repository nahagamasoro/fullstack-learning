import axios from 'axios';

const baseUrl = `http://localhost:3001/persons`;

const create = (newContact) => {
  const response = axios
    .post(baseUrl, newContact)
    .then((response) => response.data)
    .catch((error) => console.log(error.message));

  return response;
};

const getAll = () => {
  const response = axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => console.log(error.message));

  return response;
};

const destroy = (id) => {
  const response = axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message));

  return response;
};

const update = (id, data) => {
  const response = axios
    .put(`${baseUrl}/${id}`, data)
    .then((response) => response.data)
    .catch((error) => console.log(error.message));

  return response;
};

export default { create, getAll, destroy, update };
