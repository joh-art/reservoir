import React from "react";
import NavBar from "../Components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Booking from "../Pages/Booking";
import LandingPage from "../Pages/LandingPage";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";


function Header() {
  return (
    <div>
      <div className="App">
  
      <NavBar />
    
      </div>
      <div className="routes">
        <Routes>
        <Route exact path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Booking/:roomId/:checkIn/:checkOut" element={<Booking />} />
        </Routes>
      </div>
    </div>
  );
}

export default Header;
