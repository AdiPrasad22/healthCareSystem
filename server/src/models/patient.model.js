// import mongoose from "mongoose";

// const patientSchema = new mongoose.Schema(
//     {
//         fullName: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         dob: {
//             type: Date,
//             required: true
//         },
//         gender: {
//             type: String,
//             enum: ["Male", "Female", "Other"],
//             required: true
//         },
//         contactNo: {
//             type: String,
//             required: true,
//             unique: true,
//             match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
//         }
//     },
//     { timestamps: true }
// );

// const Patient = mongoose.model("Patient", patientSchema);
// export default Patient;
