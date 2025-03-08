import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { getPatientTreatments, getDoctorTreatments, getTreatmentDetails, createTreatment } from "../controllers/treatment.controller.js";

const router = express.Router();

router.post("/", protect, adminOnly, createTreatment);
router.get("/patient", protect, getPatientTreatments);
router.get("/doctor", protect, getDoctorTreatments);
router.get("/:id", protect, getTreatmentDetails);

export default router;
