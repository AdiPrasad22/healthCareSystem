import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "doctor", "patient"], required: true },

  doctorDetails: {
    specialization: String,
    experience: Number,
    clinicAddress: String,
  },

  patientDetails: {
    age: Number,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    medicalHistory: [String],
  },

  treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Treatment" }], // Stores treatment IDs
});

const User = mongoose.model("User", userSchema);
export default User;
