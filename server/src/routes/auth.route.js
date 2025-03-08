import express from "express";
import { registerAdmin, loginUser, registerDoctor, registerPatient } from "../controllers/auth.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/login", loginUser);

// Only admins can register doctors & patients
router.post("/register-doctor", protect, adminOnly, registerDoctor);
router.post("/register-patient", protect, adminOnly, registerPatient);

export default router;