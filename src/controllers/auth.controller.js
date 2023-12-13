import User from "../models/user.model.js"; // Importing the User model from the user.model.js file
import bcrypt from "bcryptjs"; // Importing the bcrypt library for password hashing
import { createAccesToken } from "../libs/jwt.js"; // Importing the createAccessToken function from the jwt.js file
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body; // Extracting the username, email, and password from the request body
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["The email is already in use"]);
    }

    const passwordHash = await bcrypt.hash(password, 10); // Hashing the password using bcrypt with a salt of 10 rounds

    const newUser = new User({
      username,
      email,
      password: passwordHash, // Storing the hashed password in the newUser object
    });
    const userSaved = await newUser.save(); // Saving the newUser object to the database

    const token = await createAccesToken({ id: userSaved._id }); // Generating an access token using the createAccessToken function

    res.cookie("token", token); // Setting the access token as a cookie in the response

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    }); // Sending a JSON response with the user details
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handling any errors that occur during the registration process
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body; // Extracting the email and password from the request body
  try {
    const userFound = await User.findOne({ email }); // Finding a user with the provided email in the database
    if (!userFound) return res.status(400).json({ message: "User not found" }); // Returning an error response if the user is not found

    const isMatch = await bcrypt.compare(password, userFound.password); // Comparing the provided password with the hashed password stored in the database
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" }); // Returning an error response if the passwords do not match

    const token = await createAccesToken({ id: userFound._id }); // Generating an access token using the createAccessToken function

    res.cookie("token", token); // Setting the access token as a cookie in the response

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    }); // Sending a JSON response with the user details
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handling any errors that occur during the login process
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", "", {
    expires: new Date(0),
  }); // Clearing the access token cookie by setting its expiration date to a past date
  return res.sendStatus(200); // Sending a success status code in the response
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized: Invalid token" });

    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(401).json({ message: "Unauthorized: user not found" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
