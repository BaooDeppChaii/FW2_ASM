import axiosClient from "./axiosClient";

// ADMIN CHECK
export const checkAdmin = async () => {
  try {
    return await axiosClient.get("/users/admin/check");
  } catch (error) {
    if (error?.response?.status === 404) {
      return axiosClient.get("/admin/check");
    }
    throw error;
  }
};

// LIST
export const getUsers = () =>
  axiosClient.get("/users/list");

// DETAIL
export const getUserById = (id) =>
  axiosClient.get(`/users/${id}`);

// CREATE (PHẢI DÙNG REGISTER)
export const createUser = (data) =>
  axiosClient.post("/users/register", data);

// UPDATE ACTIVE
export const updateUser = (id, data) =>
  axiosClient.put(`/users/${id}`, data);

// DELETE = khóa user
export const deleteUser = (id) =>
  axiosClient.put(`/users/${id}`, { active: "0" });