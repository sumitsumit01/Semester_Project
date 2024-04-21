



import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddEventForm.css";
import marathon from "./Marathon.jpg";
import sport from "./Sports.jpg";
import planting from "./PlantationTeamBuilding.jpeg";
import charity from "./CharityTeamBuilding.jpg";
import cheer from "./PeopleCheering.jpg";

function AddEventForm() {
  const [formData, setFormData] = useState({
    eventName: "",
    organization: "",
    time: "",
    dayDate: "",
    venue: "",
    totalSeats: 0,
    cost: 0,
    image: null,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("eventName", formData.eventName);
      formDataToSend.append("organization", formData.organization);
      formDataToSend.append("time", formData.time);
      formDataToSend.append("dayDate", formData.dayDate);
      formDataToSend.append("venue", formData.venue);
      formDataToSend.append("totalSeats", formData.totalSeats);
      formDataToSend.append("cost", formData.cost);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:3000/eventsAdd",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Event added:", response.data);
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error.message);
      alert("Error adding event");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(true); // Assuming admin if token is present
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate("/login"); // Navigate to login page if not logged in
    }
  }, [navigate]);

  if (!isLoggedIn || !isAdmin) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div className="container">
      <h2>Add Event</h2>
      <h3>If you are willing to host an event then contact us.</h3>
      <h3>Fill in the details of the event and let the world know about it.</h3>
      <div className="row">
        <div className="image-container" style={{ float: "right" }}>
          <img className="image" src={marathon} alt="Image1" />
          <img className="image" src={sport} alt="Image2" />
          <img className="image" src={planting} alt="Image3" />
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <p>***All fields are required***</p>
          <div className="form-group">
            <label>Event Name:</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Organization:</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="dayDate"
              value={formData.dayDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Venue:</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Total Seats:</label>
            <input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cost:</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              required
            />
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>
      <div className="row2">
        <img
          className="image-seperate"
          src={cheer}
          alt="Image5"
          style={{ marginLeft: "50px" }}
        />
        <img className="image-seperate" src={charity} alt="Image5" />
      </div>
      <div>
        <button onClick={() => navigate("/")}>Home Page</button>
      </div>
    </div>
  );
}

export default AddEventForm;
