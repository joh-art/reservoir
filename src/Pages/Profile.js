import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import { useAuth } from '../Components/AuthContext';
import BookingDetails from './BookingDetails';

function Profile() {
  const { TabPane } = Tabs;
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          await axios.get(`http://localhost:5000/users`, {
            params: { userid: currentUser._id }, // Use params to send userid as a query parameter
          });
         
          // Handle the rooms data as needed
        }
      } catch (error) {
        console.error('Error fetching user rooms:', error);
        // Handle the error (e.g., show an error message)
      }
    };

    fetchData(); // Call the fetchData function inside useEffect

  }, [currentUser]);

  return (
    <div className='ml-5 mt-3'>
      <Tabs defaultActiveKey='1' type='card'>
        <TabPane tab='Profile' key='1'>
          <h1>My Profile</h1>
          <br />
          {currentUser ? (
            <>
              <h1>Name: {currentUser.username}</h1>
              <h1>Email: {currentUser.email}</h1>
              <h1>Admin: {currentUser.isAdmin ? 'Yes' : 'No'}</h1>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </TabPane>
        <TabPane tab='Booking Detail' key='2'>
          <h1>My Booking</h1>
          <BookingDetails/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function BookingDetails() {
//   const [booking, setBooking] = useState(null); // Initialize booking state
//   const { bookingId } = useParams(); // Get the bookingId from the URL

//   useEffect(() => {
//     // Define a function to fetch booking data
//     const fetchBookingData = async () => {
//       try {
//         // Replace 'http://localhost:5000' with your backend API URL
//         const response = await axios.get(
//           `http://localhost:5000/getbookingbyuserid` // Use the bookingId to fetch the specific booking
//         );

//         const bookingData = response.data;
//         console.log('Received Booking Data:', bookingData); // Log the received data
//         setBooking(bookingData); // Update the booking state with fetched data
//       } catch (error) {
//         console.error('API Error:', error); // Log any API errors
//       }
//     };

//     // Call the fetchBookingData function inside useEffect
//     fetchBookingData();

//     // Include bookingId in the dependency array
//   }, [bookingId]);

//   console.log('Booking State:', booking); // Log the current booking state

//   return (
//     <div>
//       {booking ? (
//         <div className='boxshadow' key={booking._id}>
//           {/* Display booking details */}
//           <h1>Booking ID: {booking._id}</h1>
//           <p><b>Room</b>: {booking.room}</p>
//           <p><b>Check-In</b>: {booking.checkIn}</p>
//           <p><b>Check-Out</b>: {booking.checkOut}</p>
//           <p><b>Total Amount</b>: {booking.totalAmount}</p>
//           <p><b>Status</b>: {booking.status === "booked" ? "CONFIRMED" : "CANCELLED"}</p>
//         </div>
//       ) : (
//         <p>Loading booking details...</p>
//       )}
//     </div>
//   );
// }

// export default BookingDetails;
