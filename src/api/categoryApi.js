import axiosClient from "./axiosClient";

export const getCategories = () =>
  axiosClient.get("/categories/list");

export const createCategory = (data) =>
  axiosClient.post("/categories/add", data);

export const updateCategory = (id, data) =>
  axiosClient.put(`/categories/${id}`, data);

export const deleteCategory = (id) =>
  axiosClient.delete(`/categories/${id}`);

export const getCategoryById = (id) =>
  axiosClient.get(`/categories/${id}`);