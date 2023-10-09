import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import the AuthContext
import axios from 'axios';

function NavBar() {
  const { protectRoute } = useContext(AuthContext); // Access the user object from the context
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (protectRoute.user) {
      // Access the user's ID from protectRoute
      const userId = protectRoute.user.id;

      async function fetchUserById() {
        try {
          // Update the URL to fetch user data by ID
          const response = await axios.get(`http://localhost:8000/protectRoute/${userId}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      fetchUserById();
    }
  }, [protectRoute]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Reservoir
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {user ? (
                // Display the user's information if data is available
                <span className="nav-link">Welcome, {user.username}</span>
              ) : (
                // If no data is available, display the registration and login links
                <>
                  <Link className="nav-link" to="/Register">
                    Register
                  </Link>
                  <Link className="nav-link" to="/Login">
                    Login
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
