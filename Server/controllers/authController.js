import { SECRET } from "../secrets.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateJwtToken.js";
import jwt from "jsonwebtoken";
import isAdmin from "../middlewares/isAdmin.js";
import User from "../models/userModel.js";
import Announcement from "../models/announcementModel.js";
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
          permission: userExist.permissions,
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
      const updateUser = await User.findByIdAndUpdate(
        user._id,
        {
          ...(role === "admin"
            ? { permissions: "all" }
            : { permissions: "read" }),
        },
        { new: true }
      );
      const data = {
        name,
        role: user.role,
        email: user.email,
        permission: updateUser.permissions,
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

export const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find().select(
      "-password -createdAt -updatedAt -__v"
    );
    res?.status(200).json({ errorMessage: null, data: Users });
  } catch (err) {
    res?.status(500).json({ errorMessage: "Internal server error!" });
  }
};

export const updateUserPermission = async (req, res) => {
  try {
    const { email, permission } = req.body;
    if (!email || !permission) {
      return res
        ?.status(500)
        .json({ errorMessage: "Please provide sufficient data!" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { permissions: permission },
      { new: true }
    );
    res.status(200).json({ errorMessage: null });
  } catch (err) {
    res?.status(500).json({ errorMessage: "Internal server error!" });
  }
};

export const crudOnAnnouncement = async (req, res) => {
  try {
    const { action, data, id } = req.body;
    if (action === "create") {
      const newAnnouncement = await Announcement.create({
        announcement: data,
      });
      res.status(200).json({ errorMessage: "null" });
    } else if (action === "edit") {
      const updateAnnouncement = await Announcement.findByIdAndUpdate(
        id,
        { announcement: data },
        { new: true }
      );
      res.status(200).json({ errorMessage: "null" });
    } else {
      const updateAnnouncement = await Announcement.findByIdAndDelete(id);
      res.status(200).json({ errorMessage: "null" });
    }
  } catch (err) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getAnnouncementController = async (req, res) => {
  try {
    const data = await Announcement.find();
    res.status(200).json({ errorMessage: null, data });
  } catch (err) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
