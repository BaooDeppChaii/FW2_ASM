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
export const getUserOrders = async (userId) => {
  try {
    return await axiosClient.get("/orders/me");
  } catch (error) {
    const status = error?.response?.status;

    // Only fallback when backend does not expose /orders/me.
    // Do not fallback on auth errors, otherwise cancel actions will fail later.
    if (status === 404 || status === 405) {
      const res = await axiosClient.get("/orders/list");
      const allOrders = res?.data?.data || res?.data || [];

      return {
        ...res,
        data: {
          ...(res?.data || {}),
          data: Array.isArray(allOrders)
            ? allOrders.filter((o) => String(o.user_id) === String(userId))
            : [],
        },
      };
    }

    throw error;
  }
};
export const cancelOrder = async (id) => {
  const attempts = [
    () => axiosClient.patch(`/orders/${id}/cancel`),
    () => axiosClient.put(`/orders/${id}/cancel`),
    () => axiosClient.patch(`/order/${id}/cancel`),
    () => axiosClient.put(`/order/${id}/cancel`),
    () => axiosClient.patch(`/orders/cancel/${id}`),
    () => axiosClient.put(`/orders/cancel/${id}`),
  ];

  let lastError;

  for (const request of attempts) {
    try {
      return await request();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404 || status === 405) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  throw lastError;
};
export const getOrdersDetail = (id) => 
  axiosClient.get(`/orders/${id}`);

// ADMIN CANCEL ORDER (mọi trạng thái)
export const adminCancelOrder = (id) => {
  return axiosClient.put(`/orders/${id}/cancel/admin`);
};