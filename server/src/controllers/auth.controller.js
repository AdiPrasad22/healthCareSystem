import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

/**
 * Admin Registration
 */
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({ name, email, password: hashedPassword, role: "admin" });
    await admin.save();

    res.status(201).json({
      token: generateToken(admin._id, admin.role),
      user: { id: admin._id, name: admin.name, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

/**
 * User Login (Admin, Doctor, Patient)
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user._id, user.role),
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Admin registers a new Doctor
 */
export const registerDoctor = async (req, res) => {
  const { name, email, password, specialization, experience, clinicAddress } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Doctor already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
      doctorDetails: { specialization, experience, clinicAddress },
    });

    await doctor.save();

    res.status(201).json({ message: "Doctor registered successfully!", doctorId: doctor._id });
  } catch (error) {
    res.status(500).json({ message: "Error registering doctor", error });
  }
};

/**
 * Admin registers a new Patient
 */
export const registerPatient = async (req, res) => {
  const { name, email, password, age, gender, medicalHistory } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Patient already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = new User({
      name,
      email,
      password: hashedPassword,
      role: "patient",
      patientDetails: { age, gender, medicalHistory },
    });

    await patient.save();

    res.status(201).json({ message: "Patient registered successfully!", patientId: patient._id });
  } catch (error) {
    res.status(500).json({ message: "Error registering patient", error });
  }
};