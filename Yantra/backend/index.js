
// index.js
const authRoutes = require("./authRoutes"); 
const express = require("express");
const mongoose = require("mongoose");
const eventRoutes = require("./routes");
const cors = require("cors");
const app = express();
const morgan=require("morgan")
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

// Middleware
app.use(express.json());
// app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(cors());



// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://adityakumar0718:harsh1234@cluster0.eygfkdg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err.message);
  });

// Routes
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

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});
app.use("/auth", authRoutes);
app.use("/", eventRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

