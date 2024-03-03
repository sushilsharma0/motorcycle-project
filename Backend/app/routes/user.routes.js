const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models"); // Assuming you have a user model defined
const { body, validationResult } = require("express-validator");
// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Plese provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character"),
];

// CREATE a new user
router.post("/register",validateUser, async (req, res) => {
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(500).json({errors:errors.array()})

  }
  try {
    bcrypt.hash(req.body.password, 10).then((hashedpassword) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword,
      });
      user
        .save()
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a user by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a user by ID
router.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    bcrypt
      .compare(req.body.password, user.password)
      .then((passwordCheck) => {
        if (!passwordCheck) {
          return res.status(500).json({ message: "Password didn't match" });
        }
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM-TOKEN",
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          message: "login sucessful",
          id: user._id,
          email: user.email,
          name: user.name,
          token,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: "Email didn't match" });
      });
  });
});

module.exports = router;
