import { SECRET } from "../secrets.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateJwtToken.js";
import jwt from "jsonwebtoken";
export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    let userExist = await User.findOne({ email });
    let allData;
    if (!userExist) {
      return res.status(404).json({
        errorMessage: "Incorrect email or password",
      });
    } else {
      allData = await User.findById(userExist._id);
      let correctPassword = bcrypt.compareSync(password, userExist.password);
      if (!correctPassword) {
        return res
          .status(401)
          .json({ errorMessage: "Incorrect email or password" });
      } else {
        let dataTojson = {
          name: userExist.name,
          email: userExist.email,
          role: userExist.role,
        };
        const token = generateToken(dataTojson, { expiresIn: "3d" });
        res
          .status(201)
          .json({ errorMessage: null, response: { ...dataTojson, token } });
      }
    }
  } catch (err) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    let { password, name, email, role } = req.body;

    if (!password || !name || !email || !role) {
      return res.status(400).json({ errorMessage: "Missing required fields" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          errorMessage: "A user with this email already exists.",
        });
      }
      let hashed = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashed,
        role: role,
        name,
      });

      const data = {
        name,
        role: user.role,
        email: user.email,
      };

      let token = generateToken(data, { expiresIn: "2d" });
      const response = { errorMessage: null, data: { ...data, token } };
      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorMessage: "Internal server error!" });
    }
  } catch (err) {
    res.status(500).json({ errorMessage: "Internal server error!" });
  }
};
