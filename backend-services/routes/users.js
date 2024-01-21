const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// authenticate JWT token
const authenticateToken = (req, res, next) => {
  // Using split because I am getting token like Bearer token_str reference: https://stackoverflow.com/questions/48606341/jwt-gives-jsonwebtokenerror-invalid-token
  const token = req.header("Authorization")?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      // console.error("JWT Verification Error:", error);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // create a new user
    const user = new User({ username, email, password });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate and send JWT token and send Id
    const token = user.generateAuthToken();
    const userId = user._id.toString();
    // console.log(token);
    res.json({ username: user.username, token, userId });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// change password and username route
router.put("/update/:userId", authenticateToken, async (req, res) => {
  try {
    const userIdToUpdate = req.params.userId;
    const { username, email, password, newpassword } = req.body;
    const currentUserId = req.user._id;

    if (currentUserId !== userIdToUpdate) {
      return res.status(403).json({ message: "Permission required" });
    }

    // Find the user by ID
    const userToUpdate = await User.findById(userIdToUpdate);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // update username
    if (username) {
      // check if username is already taken
      const existingUser = await User.findOne({ username: username });
      if (existingUser && existingUser._id.toString() !== userIdToUpdate) {
        return res.status(400).json({ message: "Username already exists" });
      }

      userToUpdate.username = username;
    }

    // update email
    if (email) {
      const existingUserWithEmail = await User.findOne({ email: email });
      if (
        existingUserWithEmail &&
        existingUserWithEmail._id.toString() !== userIdToUpdate
      ) {
        return res.status(400).json({ message: "Email already exists" });
      }

      userToUpdate.email = email;
    }

    // update password
    if (password) {
      // Check if the provided old password matches the current password
      const isPasswordValid = await userToUpdate.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Old password is incorrect" });
      }

      // Set the new password
      userToUpdate.password = newpassword;
    }

    // console.log("New UserName", username);
    // console.log("New email", email);
    // console.log("password", password);
    // console.log("New password", newpassword);

    await userToUpdate.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "New password is required" });
  }
});

// Protected route to get individual user information
router.get("/user/:userId", authenticateToken, async (req, res) => {
  try {
    const userIdToRetrieve = req.params.userId;
    const currentUserId = req.user._id;

    if (currentUserId !== userIdToRetrieve) {
      return res.status(403).json({ message: "Permission required" });
    }

    // Find the user by ID
    const userToRetrieve = await User.findById(userIdToRetrieve);

    if (!userToRetrieve) {
      return res.status(404).json({ message: "User not found" });
    }

    const responseData = {
      username: userToRetrieve.username,
      email: userToRetrieve.email,
      _id: userToRetrieve._id,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete user route
router.delete("/user/delete/:userId", authenticateToken, async (req, res) => {
  try {
    const userIdToDelete = req.params.userId;
    const currentUserId = req.user._id;

    if (currentUserId !== userIdToDelete) {
      return res.status(403).json({ message: "Permission required" });
    }

    // Use deleteOne method to delete the user
    const result = await User.deleteOne({ _id: userIdToDelete });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
