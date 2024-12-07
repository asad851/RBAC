import jwt from "jsonwebtoken";
import { SECRET } from "../secrets.js";
export default function generateToken(data, expiresIn) {
  return jwt.sign(data, SECRET, expiresIn );
}