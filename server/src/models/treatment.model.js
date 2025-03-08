import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  diagnosis: { type: String, required: true },
  treatmentPlan: { type: String, required: true },
  pastAppointments: [{ date: Date, notes: String }],
  nextAppointment: { date: Date, notes: String },

  createdAt: { type: Date, default: Date.now }
});

const Treatment = mongoose.model("Treatment", treatmentSchema);
export default Treatment;
