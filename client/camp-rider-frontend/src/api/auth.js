import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth", // your backend
  withCredentials: true,
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const forgotPassword = (data) => API.post("/forgot-password", data);
export const resetPassword = (token, data) =>
  API.post(`/reset-password/${token}`, data);
