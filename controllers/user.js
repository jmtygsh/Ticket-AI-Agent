import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { inngest } from "../inngest/client.js";

export const signUp = async (req, res) => {
  try {
    const { email, password, skills = [] } = req.body;

    // 1. Check for missing email or password
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // 2. Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }

    // 3. Await the hashing process (THIS IS THE FIX)
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashed, skills });

    // fire inngest event
    await inngest.send({
      name: "user/signup",
      data: { email },
    });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(201).json({ user, token }); // Use 201 Created for new resources
  } catch (error) {
    console.error("SIGNUP FAILED:", error); // Log the full error on the server
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

export const logOut = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(400).json({ error: "unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) return res.status(401).json({ error: "unauthorized" });
    });

    res.json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { skills = [], role, email } = req.body;
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "user not found" });

    await User.updateOne(
      { email },
      { skills: skills.lenght ? skills : user.skills, role }
    );

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed", details: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Get users failed", details: error.message });
  }
};
