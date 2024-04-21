

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import Home from "./components/Home"; 
import AboutUsPage from "./components/AboutUs";
import AddEventForm from "./components/AddEventForm";
import EventDetails from "./components/EventDetails";
import MapContainer from "./components/MapContainer";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin/add-event" element={<AddEventForm />} />
          <Route path="/maps" element={<MapContainer />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/about-us" element={<AboutUsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
