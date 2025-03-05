import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        specialization: {
            type: String,
            required: true
        },
        availability_schedule: {
            type: [String], // Example: ["Monday 10AM-2PM", "Wednesday 3PM-6PM"]
            required: true
        },
        consultation_fee: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
