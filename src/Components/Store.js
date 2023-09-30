import React, { Component } from 'react';

function withUser(WrappedComponent) {
  return class WithUser extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null, // Initialize user as null
        isAuthenticated: false, // Initialize isAuthenticated as false
      };
    }

    componentDidMount() {
      // Fetch user data or authentication status here
      // For example, you can check localStorage or make an API call
// Check if a user is authenticated based on your logic
const isAuthenticated = checkAuthenticationStatus();

// Function to check if the user is authenticated
function checkAuthenticationStatus() {
  // Check if the user is logged in, has a valid token, or any other criteria
  // You might check a JWT token, session, or any other authentication method
  // Return true if authenticated, false otherwise
  const token = localStorage.getItem('token'); // Example: Retrieve a JWT token from localStorage
  const isLoggedIn = token ? true : false;
  return isLoggedIn;
}
      // Fetch user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (isAuthenticated && storedUser) {
        // If the user is authenticated and user data exists, set them in the state
        this.setState({ user: storedUser, isAuthenticated: true });
      }
    }

    render() {
      // Pass the user and isAuthenticated props to the wrapped component
      return (
        <WrappedComponent
          user={this.state.user}
          isAuthenticated={this.state.isAuthenticated}
          {...this.props}
        />
      );
    }
  };
}

export default withUser;
