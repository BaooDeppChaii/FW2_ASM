import axiosClient from "./axiosClient";

export const getMyCart = () => axiosClient.get("/carts/me");

export const addCartItem = (data) => axiosClient.post("/carts/add-item", data);

export const updateCartItem = (id, data) =>
  axiosClient.put(`/carts/items/${id}`, data);

export const deleteCartItem = (id) =>
  axiosClient.delete(`/carts/items/${id}`);

export const checkoutCart = (data) => axiosClient.post("/carts/checkout", data);