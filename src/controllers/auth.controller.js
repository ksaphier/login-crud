import User from "../models/user.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({
      username,
      email,
      password,
    });
    const userSaved = await newUser.save();
    res.json(userSaved);
  } catch (error) {
    // Send an error response here
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
    return; // Make sure to return after sending the response
  }
};

export const login = async (req, res) => {
  try {
    // Your login logic here
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
    return;
  }
};
