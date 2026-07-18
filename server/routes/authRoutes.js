import express from "express";
import { getMe, login, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateLogin, validateRegister } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", protect, getMe);
router.get("/test", (req, res) => {
  res.json({ message: "Auth route works!" });
});

export default router;
