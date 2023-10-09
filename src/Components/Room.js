import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function Room({ room, checkIn, checkOut }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row boxshadow">
      <div className="col-md-4">
        <img src={room.imgurls[0]} className="smallimg" alt="smallimage" />
      </div>
      <div className="col-md-7">
        <h3>{room.name}</h3>
        <b>
          <p>Capacity : {room.capacity}</p>
          <p>PhoneNumber : {room.phonenumber}</p>
          <p>Type : {room.type}</p>
          <p>Price: {room.price}</p>
        </b>
        <div style={{ float: "right" }} className="">
          {checkIn && checkOut && (
            <Link to={`/Booking/${room._id}/${checkIn}/${checkOut}`}>
              {/* Use room._id for the room ID */}
              <button className="btn btn-primary m-3">Book Room</button>
            </Link>
          )}
          <button onClick={handleShow} className="btn btn-primary">
            View Details
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imgurls.map((url) => (
              <Carousel.Item key={url}>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt="Second slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description} </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
