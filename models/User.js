import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["mentee", "mentor"], required: true },
  isActive: { type: Boolean, default: false }, // For mentor availability,
  college: String,
  state: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);
