import axios from "axios";

const API = "http://localhost:3000";

export const getCategories = () =>
  axios.get(`${API}/categories/list`);

export const addCategory = (data) =>
  axios.post(`${API}/categories/add`, data);

export const updateCategory = (id, data) =>
  axios.put(`${API}/categories/${id}`, data);

export const deleteCategory = (id) =>
  axios.delete(`${API}/categories/${id}`);

export const getCategoryById = (id) =>
  axios.get(`${API}/categories/${id}`);