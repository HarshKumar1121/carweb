// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:4000/api",
// });

// export const signup = (data) => API.post("/signup", data);
// export const login = (data) => API.post("/login", data);
// export const getDashboardData = (token) =>
//   API.get("/dashboard", {
//     headers: { Authorization: `Bearer ${token}` },
//   });



// import axios from "axios";
// const api = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: true,
// });
// export default api;

import axios from "axios";

export const API_URL = "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}