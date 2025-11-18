import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const signup = (data) => API.post("/signup", data);
export const login = (data) => API.post("/login", data);
export const getDashboardData = (token) =>
  API.get("/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
