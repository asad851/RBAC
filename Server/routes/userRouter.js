import express from "express";
const router = express.Router();
import User from "../models/userModel.js";
import { loginController } from "../controllers/authController.js";
import isAdmin from "../middlewares/isAdmin.js";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt";
import generateToken from "../utils/generateJwtToken.js";
import dotenv from "dotenv";
import { register } from "../controllers/authController.js";
dotenv.config();
router.post("/login", loginController);
router.post("/register",register)

export default router;
