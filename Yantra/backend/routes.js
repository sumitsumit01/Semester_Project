
// routes.js
const express = require("express");
const router = express.Router();
const Event = require("./eventModel");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("./authMiddleware");
const Order = require("./orderModel");
const PORT = 3000;
// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });



// router.post("/orders", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     // Create order options
//     const options = {
//       amount: amount * 100, // Razorpay requires amount in paisa (smallest currency unit)
//       currency: "INR",
//     };

//     // Create order using Razorpay API
//     razorpay.orders.create(options, (err, order) => {
//       if (err) {
//         console.error("Error creating order:", err);
//         return res.status(500).json({ message: "Error creating order" });
//       } else {
//         // Order created successfully, return order_id to the client
//         res.status(200).json({ order_id: order.id });
//       }
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Error creating order" });
//   }
// });

// Endpoint to add an event with image upload
router.post(
  "/eventsAdd",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { eventName, organization, time, dayDate, venue, totalSeats, cost } =
        req.body;

      // Check if image file is uploaded
      let imageUrl;
      if (req.file) {
        imageUrl = `http://localhost:${PORT}/images/${req.file.filename}`;
      }

      // Create new event with image URL
      const newEvent = await Event.create({
        eventName,
        organization,
        time,
        dayDate,
        venue,
        totalSeats,
        cost,
        imageUrl, // Add imageUrl to the event object
      });

      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Endpoint to fetch all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to retrieve an event by ID
router.get("/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to update the seats booked for an event
router.put("/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const { ticketsBooked } = req.body;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update the number of tickets booked
    event.seatsBooked += ticketsBooked;
    await event.save();

    res.status(200).json({ message: "Tickets booked successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to delete an event by ID
router.delete("/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
