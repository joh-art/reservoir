import React,{useState} from 'react';
import Login from '../Pages/Login'
import Register from '../Pages/Register'

function LandingPage() {


  const [isLogin, setIsLogin] = useState("Login"); // State to track the active form

  const toggle = () => {
    // Toggle between login and register when the button is clicked
    setIsLogin(!isLogin);
  };


  return (
    <>
       <div className="home bg- d-flex justify-content-center align-items-center vh-90">

      <div className="content">
        <div className='login-register'>
        {
          isLogin === "Login" ?
          <Login onFormSwitch={toggle} /> : <Register onFormSwitch={toggle}  /> 
        }
        </div>
      </div>
      </div>
  
    
   
    </>
  );
}

export default LandingPage;
