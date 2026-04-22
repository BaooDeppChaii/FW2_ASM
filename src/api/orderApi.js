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
export const getUserOrders = () => 
  axiosClient.get("/orders/list");
export const cancelOrder = (id) => 
  axiosClient.put(`/orders/${id}`, { status: 'Cancelled' });
export const getOrdersDetail = (id) => 
  axiosClient.get(`/orders/${id}`);