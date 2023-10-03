
// AuthContext.js (Updated)
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const {userId} = useParams([])
  const [user, setUser] = useState({
    userId: null,
    username: '',
    // Other user properties
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the user ID is valid (you can add more validation as needed)
        if (!user || !user.userId) {
          throw new Error('User ID is missing or invalid');
        }

        // Fetch user data from the backend API
        const response = await axios.get(`http://localhost:8000/users/getUserById/${userId}`);
        const userData = response.data;

        // Update user state based on previous state (functional update)
        setUser(prevUser => ({
          ...prevUser,
          ...userData
        }));
      } catch (error) {
        // Handle errors (e.g., user not authenticated or invalid user ID)
        setUser(null); // Set user to null on error
        console.error(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [userId]); // Include user?.userId in the dependency array

  // Other authentication-related functions (login, logout) can be added here

  const value = {
    user,
    // Add your authentication functions here (e.g., login, logout)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
