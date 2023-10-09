import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout"; // Updated import
import Loader from "../Components/Loader";
import swal from "sweetalert";
import { AuthContext } from "../Components/AuthContext";

function BookingPage() {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { roomId, checkIn, checkOut } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (roomId != null) {
      setLoading(true);
      setError(null);

      axios
        .get(`http://localhost:8000/rooms/rooms/${roomId}`)
        .then((response) => {
          const roomData = response.data;
          setRoom(roomData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error);
          setLoading(false);
        });
    }
  }, [roomId]);

  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const checkInDate = parseDate(checkIn);
  const checkOutDate = parseDate(checkOut);
  const timeDiff = checkOutDate.getTime() - checkInDate.getTime(); // Get the time difference in milliseconds
  const totalDays = Math.ceil(timeDiff / (31000 * 3600 * 24)); // Convert milliseconds to days and round up

  const onToken = async (token) => {
    try {
      const response = await axios.post("http://localhost:5000/booking", {
        token,
      });
      const data = response.data;
      alert(`Payment successful, ${data.email}`);

      // After successful payment, call the bookRoom function
      bookRoom();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function bookRoom() {
    const bookingData = {
      room: room.name,
      roomId,
      userId: JSON.parse(localStorage.getItem("currentUser")).id,
      checkIn,
      checkOut,
      totalDays,
      totalAmount: room.price * totalDays,
      transactionId: "12345",
      status: "booked",
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/booking", bookingData);
      setLoading(false);
      swal.fire("Congratulations", "Room Booked Successfully");
      console.log("Booking created successfully!");
    } catch (error) {
      setLoading(false);
      swal.fire("something went wrong");
      console.error("Error:", error);
    }
  }

  return (
    <div className="container m-2 justify-content-center">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : error ? (
        <h1>Error: {error.message}</h1>
      ) : room ? (
        <div className="row justify-content-center mt-5 boxshadow">
          <div className="col-md-5">
            <h1>{room.name}</h1>
            <img src={room.imgurls} className="bigimg" alt="bigimg" />
          </div>
          <div className="col-md-5">
            <h1>Booking Details</h1>
            <hr />
            <b>
              <p>Name: {user.username}</p>
              <p>Capacity: {room.capacity}</p>
              <p>From: {checkIn}</p>
              <p>To: {checkOut}</p>
            </b>
          </div>
          <div>
            <h1>Amount</h1>
            <hr />
            <b>
              <p>Number Of Days: {totalDays}</p>
              <p>Price: {room.price}</p>
              <p>Total Amount: {totalDays * room.price}</p>
            </b>
          </div>
          <div style={{ float: "right" }}>
            {/* Updated StripeCheckout */}
            <StripeCheckout
              token={onToken}
              stripeKey="pk_test_51Nuc3DIW3dHV2cj5FgaFRUjFQk8OV5Yq7q1LGBa5Uz6H44HNbCnTubiwKQXzTNusiAODTsdvnrHsUjqHn2ufiFEr00i6LLal0z"
              amount={totalDays * room.price * 100} // Amount in cents (e.g., $10.00)
              currency="NGN"
            >
              <button className="btn btn-primary">Pay Now</button>
            </StripeCheckout>
          </div>
        </div>
      ) : (
        <h1>Room not found</h1>
      )}
    </div>
  );
}

export default BookingPage;
