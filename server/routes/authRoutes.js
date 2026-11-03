import express from "express";
import { getProfile, login, register } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//public routes
router.post("/register", register);
router.post("/login", login);

//protected route
router.get("/profile", authMiddleware, getProfile);

export default router;
