import axiosClient from "./axiosClient";

//  GET LIST
export const getProducts = () =>
  axiosClient.get("/products/list");

//  GET BY ID
export const getProductById = (id) =>
  axiosClient.get(`/products/${id}`);

//  CREATE
export const createProduct = (data) =>
  axiosClient.post("/products/add", data);

//  UPDATE
export const updateProduct = (id, data) =>
  axiosClient.put(`/products/${id}`, data);

//  DELETE
export const deleteProduct = (id) =>
  axiosClient.delete(`/products/${id}`);