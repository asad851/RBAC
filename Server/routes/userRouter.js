import express from "express";
const router = express.Router();
import User from "../models/userModel.js";
import { crudOnAnnouncement, getAnnouncementController, loginController } from "../controllers/authController.js";
import isAdmin from "../middlewares/isAdmin.js";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt";
import generateToken from "../utils/generateJwtToken.js";
import dotenv from "dotenv";
import {
  register,
  getAllUsers,
  updateUserPermission,
} from "../controllers/authController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
dotenv.config();
router.post("/login", loginController);
router.post("/register", register);
router.get("/all", isAdmin, getAllUsers);
router.post("/update", isAdmin, updateUserPermission);
router.post("/announcement",isLoggedIn,crudOnAnnouncement)
router.get("/announcements/all",isLoggedIn,getAnnouncementController)
export default router;
