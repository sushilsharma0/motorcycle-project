// Require necessary packages
require("dotenv").config();
const express = require("express"); // Express.js for creating the server
const mongoose = require("mongoose"); // Mongoose for MongoDB interactions
const cors = require("cors"); // CORS for cross-origin requests
const userRoute = require("./app/routes/user.routes"); // Importing user routes
const app = express(); // Creating an instance of the Express app
const bodyParser = require("body-parser"); // Body parser middleware for parsing request bodies
const productRoute = require("./app/routes/product.routes");

// Enable CORS for all routes
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000; // Define the port number for the server to listen on

// // MongoDB connection URI
// const uri =
//   "mongodb+srv://abhisah308:abhis308@motorcycleecommerce.azoa3vu.mongodb.net/?retryWrites=true&w=majority&appName=motorcycleEcommerce";

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (error) {
    console.log(error.message);
  });

// Root route that responds with "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route for handling user-related endpoints, using the userRoute router
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});
