import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate within the functional component

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Create a user object with the login data
      const user = {
        email,
        password,
      };

      // Make a POST request to your backend API for user login
      const response = await axios.post(
        "http://localhost:8000/users/login",
        user
      );

      // Handle the response, e.g., store the JWT token and redirect the user
      const responseData = response.data;
      console.log(responseData);

      if (
        response.status === 200 &&
        responseData.message === "Login successful"
      ) {
        // Store the JWT token securely in local storage
     // Assuming the server responds with a token upon successful login
     const { token } = response.data;

     // Save the token to local storage
     localStorage.setItem('token', token);
        // Handle successful login, e.g., redirect to the dashboard
        navigate("/Home");
      } else {
        // Handle invalid credentials or other errors
        // You can display an error message here if needed
        console.error("Login error:", responseData.message);
      }
    } catch (error) {
      // Handle network errors or unexpected server responses
      console.error("Login error:", error.message);
      // You can also display a generic error message to the user
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 w-100">
          <div className="boxshadow">
            <h2>Login</h2>
            <form>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-primary mt-3"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
            <button
              className="login-btn btn-info btn-xs text-center mt-5 ml-3 text-white custom-bg "
              onClick={() => navigate("Register")}
            >
              Don't have an account? Register.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
