import axios from "axios";

const API = "http://localhost:3000/categories";

export const getCategories = () => axios.get(API);
export const addCategory = (data) => axios.post(API, data);
export const updateCategory = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API}/${id}`);