import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const registerUrl = 'http://localhost:5000/users/register';

function Register(props) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the passwords match
    if (password === confirmPassword) {
      try {
        // Create a user object with the form data
        const user = {
          username,
          email,
          password,
        };
  
        // Make a POST request to your backend API for user registration
        const response = await axios.post(registerUrl, user);
  
        // Handle the response, e.g., show a success message to the user
        console.log('Registration successful:', response.data);
        // Set the registered username using setUsername
  
        // Clear form data
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
  
        // Redirect the user to the login page after successful registration
        navigate('/Login');
      } catch (error) {
        // Handle any errors from the server, e.g., display an error message
        console.error('Registration error:', error.response ? error.response.data : error.message);
      }
    } else {
      alert('Password does not match');
    }
  };
  
  
  

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 w-100">
          <div className="boxshadow">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Name:</label>
                <input
                className='form-control'
                  type="text"
                  id="name"
                  name="name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                className='form-control'
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                className='form-control'
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                className='form-control'
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary mt-3" onClick={handleSubmit} type="submit">
                Register
              </button>
            </form>
            <button className='register-btn' onClick={() => props.onFormSwitch('Login')}>Already have an account? Login.</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
