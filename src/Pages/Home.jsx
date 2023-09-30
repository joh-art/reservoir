import React, { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker, Space } from "antd";
import Room from "../Components/Room";
import Loader from "../Components/Loader";

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/rooms/rooms");
        setRooms(response.data);
        setDuplicateRooms(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateRangeChange = (dates) => {
    if (!Array.isArray(duplicateRooms)) {
      console.error("duplicateRooms is not an array or is undefined.");
      return;
    }

    if (dates && dates.length === 2) {
      const startDate = formatDate(dates[0].toDate());
      const endDate = formatDate(dates[1].toDate());

      setCheckIn(startDate);
      setCheckOut(endDate);

      var availableRooms = [];

      for (const room of duplicateRooms) {
        let isAvailable = true;

        if (
          Array.isArray(room.currentbooking) &&
          room.currentbooking.length > 0
        ) {
          for (const booking of room.currentbooking) {
            // Check if the new booking range overlaps with any existing booking
            if (
              (startDate >= booking.checkIn && startDate < booking.checkOut) ||
              (endDate > booking.checkIn && endDate <= booking.checkOut)
            ) {
              isAvailable = false;
            }
          }
        }

        if (isAvailable) {
          availableRooms.push(room);
        }
      }

      setRooms(availableRooms); // Update 'rooms' state with available rooms
    }
  };

  const filterBySearch = () => {
    const filteredRooms = duplicateRooms.filter((room) => {
      const roomName = room.name.toLowerCase();
      const searchValue = searchKey.toLowerCase();
      const roomType = room.type.toLowerCase();

      return roomName.includes(searchValue) || roomType.includes(searchValue);
    });

    setRooms(filteredRooms); // Update 'rooms' state with filtered rooms
  };

  return (
    <div className="container">
      <div className="row mt-5 boxshadow">
        <div className="col-md-3">
          <Space direction="vertical" size={12}>
            <DatePicker.RangePicker
              format="DD-MM-YYYY"
              onChange={handleDateRangeChange}
            />
          </Space>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Rooms"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch} // Call filterBySearch onKeyUp
          />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : error ? (
          <h1>Error: {error.message}</h1>
        ) : (
          rooms.map((room) => (
            <div key={room.id} className="col-md-9 mt-2">
              <Room room={room} checkIn={checkIn} checkOut={checkOut} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
