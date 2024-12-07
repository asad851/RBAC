import jwt from "jsonwebtoken";
import { SECRET } from "../secrets.js";
export default async function isSuperAdmin(req, res, next) {
  try {
    let auth = req.headers.authorization;
    if (auth) {
   
      let tokenArr = auth.split(" ");
      let token = tokenArr[1];

      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .send({
              errorMessage: "You need to login first!",
            });
        } else {
          if (decoded.role === "admin") {
            req.user = decoded;
            next();
          } else {
            return res.status(401).send({ errorMessage: "Access denied" });
          }
        }
      });
    } else {
      res
        .status(401)
        .send({
          errorMessage: "You need to login first!",
        });
    }
  } catch (err) {
    res.status(401).send({ errorMessage: "Internal server error!" });
  }
}