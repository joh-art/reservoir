import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import the AuthContext

function NavBar() {
  const { user } = useContext(AuthContext); // Access the user object from the context

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
                <span className="nav-link">Welcome, {user.username} </span>
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
