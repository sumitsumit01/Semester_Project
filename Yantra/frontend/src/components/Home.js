
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "./Home.css";

function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage authentication

  useEffect(() => {
    fetchEvents();
    // Check if token is present in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const formatEventDate = (dateString) => {
    const eventDate = new Date(dateString);
    const formattedDate = eventDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBook = async (eventId) => {
    try {
      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/events/${eventId}`
      );
      console.log("Event deleted:", response.data);
      // Update events list after successful deletion
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleScroll = () => {
    const eventNameAnimate = document.querySelector(".eventNameAnimate");
    if (eventNameAnimate && !showAnimation) {
      const topPosition = eventNameAnimate.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;
      if (topPosition < screenHeight * 0.75) {
        setShowAnimation(true);
      }
    }
  };

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-title" style={{ marginLeft: "20px" }}>
          Takatak
        </h1>
        <nav className="home-nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/maps">Events</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="Find Event by name"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </header>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main className="home-main">
          <section className="sustainable-platform">
            <div className="homeInitial">
              <div className="initialText">
                <h2>SUSTAINABLE PLATFORM</h2>
              </div>
            </div>
            {filteredEvents.map((event) => (
              <div key={event._id} className="event-container">
                {event.imageUrl && (
                  <img
                    src={`${event.imageUrl}`}
                    alt="Event"
                    style={{
                      maxWidth: "30%",
                      height: "30%",
                      float: "left",
                      paddingTop: "25%",
                      marginLeft: "auto",
                      borderRadius: "5%",
                    }}
                  />
                )}
                <div className="event-details">
                  <div
                    className={
                      showAnimation
                        ? "eventNameAnimate animate"
                        : "eventNameAnimate"
                    }
                  >
                    <h1>{event.eventName}</h1>

                    {isAuthenticated && (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          className="delete-icon"
                          onClick={() => handleDelete(event._id)}
                          style={{
                            cursor: "pointer",
                            color: "red",
                            fontSize: "60px",
                            marginLeft: "5px",
                          }}
                        >
                          &#x1F5D1;
                        </span>
                        <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                          Delete
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      width: "60%",
                      textAlign: "left",
                      paddingLeft: "25%",
                    }}
                  >
                    <p style={{ fontSize: "20px", color: "grey" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                          color: "black",
                        }}
                      >
                        VENUE
                      </span>{" "}
                      {event.venue}
                    </p>
                    <p style={{ fontSize: "20px", color: "grey" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                          color: "black",
                        }}
                      >
                        ORGANIZATION
                      </span>{" "}
                      {event.organization}
                    </p>
                    <p style={{ fontSize: "20px", color: "grey" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                          color: "black",
                        }}
                      >
                        DAY
                      </span>{" "}
                      {formatEventDate(event.dayDate)}
                    </p>
                    <p style={{ fontSize: "20px", color: "grey" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                          color: "black",
                        }}
                      >
                        TOTAL SEATS
                      </span>{" "}
                      {event.totalSeats}
                    </p>
                    <p style={{ fontSize: "20px", color: "grey" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                          color: "black",
                        }}
                      >
                        COST
                      </span>{" "}
                      {event.cost}
                    </p>
                    <p style={{ fontSize: "20px", color: "grey" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                          color: "black",
                        }}
                      >
                        REMAINING SEATS
                      </span>{" "}
                      {event.totalSeats - event.seatsBooked}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBook(event._id)}
                    style={{ cursor: "pointer" }}
                  >
                    BOOK SEAT
                  </button>
                </div>
              </div>
            ))}
          </section>
        </main>
      )}
    </div>
  );
}

export default Home;
