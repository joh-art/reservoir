import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BookingDetails() {
  const [booking, setBooking] = useState([]); // Initialize booking state
  const { userId } = useParams();

  useEffect(() => {
    // Define a function to fetch booking data
    const fetchBookingData = async () => {
      try {
        // Replace 'http://localhost:5000' with your backend API URL
        const response = await axios.post(
          'http://localhost:5000/getbookingbyuserid',
          {userId: userId} // Replace with the actual user ID
        );

        const bookingsData = response.data;
        console.log('Received Data:', bookingsData); // Log the received data
        setBooking(bookingsData); // Update the booking state with fetched data
      } catch (error) {
        console.error('API Error:', error); // Log any API errors
      }
    };

    // Call the fetchBookingData function inside useEffect
    fetchBookingData();

    // Include user._id in the dependency array
  }, [userId]);

  console.log('Booking State:', booking); // Log the current booking state

  return (
    <div>
      {booking.map((bookingItem) => (
        <div className='boxshadow' key={bookingItem._id}>
          {/* Don't forget to add a unique 'key' prop */}
          <h1>{bookingItem.room}</h1>
          <p><b>Booking ID</b>:{bookingItem._id}</p>
          <p><b>check in</b>:{bookingItem.checkIn}</p>
          <p><b>check out</b>:{bookingItem.checkOut}</p>
          <p><b>Amount</b>:{bookingItem.totalAmount}</p>
          <p><b>Status</b>:{bookingItem.status === "booked" ?"COMFIRM" : "CANCLLED"}</p>
        </div>
      ))}
    </div>
  );
}

export default BookingDetails;
