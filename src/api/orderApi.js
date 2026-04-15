import axiosClient from "./axiosClient";

// LIST ORDERS
export const getOrders = () =>
  axiosClient.get("/orders/list");

// DETAIL ORDER
export const getOrderById = (id) =>
  axiosClient.get(`/orders/${id}`);

// UPDATE STATUS
export const updateOrder = (id, data) =>
  axiosClient.put(`/orders/${id}`, data);

// DELETE ORDER
export const deleteOrder = (id) =>
  axiosClient.delete(`/orders/${id}`);

export const updateOrderStatus = (id, status) =>
  axiosClient.put(`/orders/${id}`, { status });