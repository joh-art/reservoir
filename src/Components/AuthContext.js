import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [protectRoute, setProtectRoute] = useState({ user: null });

  async function fetchData() {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No JWT token found');
      }

      const loggedInRes = await axios.get('http://localhost:8000/protectRoute', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Include the user's data in the protectRoute context
      setProtectRoute({ user: loggedInRes.data });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ protectRoute, getLoggedIn: fetchData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { AuthContext };
