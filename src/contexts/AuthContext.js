// AuthContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user data from local storage when the app starts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // const login = async (data) => {
  //   try {
  //     // Create a user object with the login data
  //     const user = data;

  //     // Make a POST request to your backend API for user login
  //     const response = await axios.post(
  //       "http://localhost:8000/users/login",
  //       user
  //     );

  //     // Handle the response, e.g., store the JWT token and redirect the user
  //     const responseData = response.data;
  //     console.log(responseData);

  //     if (
  //       response.status === 200 &&
  //       responseData.message === "Login successful"
  //     ) {
  //       // Store the JWT token securely in local storage
  //       localStorage.setItem("currentUser", JSON.stringify(response));
  //       console.log(response);
  //       // Handle successful login, e.g., redirect to the dashboard
  //       // navigate("/Home");
  //     } else {
  //       // Handle invalid credentials or other errors
  //       // You can display an error message here if needed
  //       console.error("Login error:", responseData.message);
  //     }
  //   } catch (error) {
  //     // Handle network errors or unexpected server responses
  //     console.error("Login error:", error.message);
  //     // You can also display a generic error message to the user
  //   }
  // };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Authentication logic example
  const isAuthenticated = !!user; // Check if the user object exists

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
