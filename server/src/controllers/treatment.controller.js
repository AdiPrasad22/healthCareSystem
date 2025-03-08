import Treatment from "../models/treatment.model.js";
import User from "../models/user.model.js";

/**
 * Admin assigns a new treatment to a patient with a doctor.
 */
export const createTreatment = async (req, res) => {
  const { patientId, doctorId, diagnosis, treatmentPlan, nextAppointment } = req.body;

  try {
    const patient = await User.findById(patientId);
    const doctor = await User.findById(doctorId);

    if (!patient || patient.role !== "patient") return res.status(404).json({ message: "Invalid patient ID" });
    if (!doctor || doctor.role !== "doctor") return res.status(404).json({ message: "Invalid doctor ID" });

    const newTreatment = new Treatment({ patient, doctor, diagnosis, treatmentPlan, nextAppointment });

    await newTreatment.save();

    // Add treatment to patient and doctor's treatment list
    patient.treatments.push(newTreatment._id);
    doctor.treatments.push(newTreatment._id);
    await patient.save();
    await doctor.save();

    res.status(201).json({ message: "Treatment assigned successfully!", treatment: newTreatment });
  } catch (error) {
    res.status(500).json({ message: "Error assigning treatment", error });
  }
};

/**
 * Get all ongoing treatments for a logged-in patient.
 */
export const getPatientTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find({ patient: req.user._id })
      .populate("doctor", "name email specialization");

    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching treatments", error });
  }
};

/**
 * Get all treatments assigned to a logged-in doctor.
 */
export const getDoctorTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find({ doctor: req.user._id })
      .populate("patient", "name email");

    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching treatments", error });
  }
};

/**
 * Get details of a specific treatment.
 */
export const getTreatmentDetails = async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id)
      .populate("doctor", "name email specialization")
      .populate("patient", "name email medicalHistory");

    if (!treatment) return res.status(404).json({ message: "Treatment not found" });

    // Authorization: Only the assigned doctor or patient can view this treatment
    if (req.user.role === "patient" && treatment.patient._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (req.user.role === "doctor" && treatment.doctor._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(treatment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching treatment details", error });
  }
};
