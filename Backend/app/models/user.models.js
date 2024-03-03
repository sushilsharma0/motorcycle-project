const mongoose = require("mongoose");

// Define a mongoose schema for the user
const userSchema = new mongoose.Schema(
  {
    name: String, // Field for the user's name
    email: {
      unique: true,
      trim: true,
      type: String,
      required: true,
    }, // Field for the user's email
    password: {
      minLength: 8,
      type: String,
      required: true,
    }, // Field for the user's password
  },
  {
    timestamps: true, // Option to automatically add createdAt and updatedAt fields
  }
);

// Create a mongoose model called "User" using the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model to use in other parts of the application
module.exports = User;
