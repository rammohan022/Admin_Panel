const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "30d" });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
    // Return user data without password
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role || "user" // Default role if not set
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
