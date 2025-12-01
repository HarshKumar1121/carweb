
// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [email, setEmail] = useState(localStorage.getItem("email") || null);

//   const login = (token, email) => {
//     setToken(token);
//     setEmail(email);
//     localStorage.setItem("token", token);
//     localStorage.setItem("email", email);
//   };

//   const logout = () => {
//     setToken(null);
//     setEmail(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//   };

//   return (
//     <AuthContext.Provider value={{ token, email, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


// import React, { createContext, useContext, useEffect, useState } from "react";
// import { api } from "../api";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(() => localStorage.getItem("token"));
//   const [email, setEmail] = useState(() => localStorage.getItem("email"));

//   useEffect(() => {
//     if (token) localStorage.setItem("token", token);
//     else localStorage.removeItem("token");
//   }, [token]);

//   useEffect(() => {
//     if (email) localStorage.setItem("email", email);
//     else localStorage.removeItem("email");
//   }, [email]);

//   // login makes the API call and saves token+email
//   async function login(email, password) {
//     const res = await api.post("/auth/login", { email, password });
//     setToken(res.data.token);
//     setEmail(res.data.email);
//   }

//   async function signup(email, password) {
//     await api.post("/auth/signup", { email, password });
//     await login(email, password); // auto-login after signup
//   }

//   function logout() {
//     setToken(null);
//     setEmail(null);
//   }

//   const value = { token, email, login, signup, logout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";
import { redirect } from "react-router-dom";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [email, setEmail] = useState(() => localStorage.getItem("email"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (email) localStorage.setItem("email", email);
    else localStorage.removeItem("email");
  }, [email]);

  // SIGNUP → calls backend /auth/signup → user is created in Prisma
  async function signup(email, password) {
    await api.post("/auth/signup", { email, password });
    // optional: auto login
    await login(email, password);
  }

  // LOGIN → calls backend /auth/login → token saved in state/localStorage
  async function login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    setEmail(res.data.email);
  }

  function logout() {
    setToken(null);
    setEmail(null);
    redirect(api("./login"))
  }

  const value = { token, email, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
