import express from "express";
import {
  analyzeComplaintImage,
  createComplaint,
  getComplaintById,
  getComplaintDashboard,
  getComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/analyze", analyzeComplaintImage);
router.route("/").get(getComplaints).post(createComplaint);
router.get("/dashboard", getComplaintDashboard);
router.route("/:id").get(getComplaintById).patch(updateComplaintStatus);

export default router;
