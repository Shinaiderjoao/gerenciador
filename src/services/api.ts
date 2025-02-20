import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const savePart = async (part) => {
  const response = await api.post('/parts', part);
  return response.data;
};

export const updatePart = async (id, part) => {
  const response = await api.put(`/parts/${id}`, part);
  return response.data;
};

export const deletePart = async (id) => {
  await api.delete(`/parts/${id}`);
};

export const getParts = async () => {
  const response = await api.get('/parts');
  return response.data;
}; 