import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Toggle mentor activation (authenticated)
router.post("/toggle-activation", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mentor = await User.findById(decoded.id);
    if (!mentor || mentor.role !== "mentor") return res.status(403).json({ error: "Forbidden" });

    mentor.isActive = !mentor.isActive;
    await mentor.save();
    res.json({ isActive: mentor.isActive });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" }).select("name college state rating isActive");
    res.json(mentors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
