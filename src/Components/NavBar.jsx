import React, { useState, useEffect } from "react";
import axios from "axios";

// Replace 'your_user_id' with the actual user ID you want to fetch
const USER_URL = `http://localhost:5000/user`;

function NavBar() {
  const [user, setUser] = useState(null); // Define user state

  useEffect(() => {
    // Fetch the user data when the component mounts
    axios
      .get(USER_URL) // Make sure to define USER_URL with the appropriate API endpoint
      .then((response) => {
        // Set the user state with the response data
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="!#">
          Reservoir
        </a>
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
            {user ? (
              // Display the user's information if data is available
              <li className="nav-item">
                <span className="nav-link">Welcome, {user.name}</span>
              </li>
            ) : (
              // If no data is available, display the registration and login links
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/Register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
