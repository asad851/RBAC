import jwt from "jsonwebtoken";
import { SECRET } from "../secrets.js";
export default async function isLoggedIn(req, res, next) {
  try {
    let auth = req.headers.authorization;
    if (auth) {
      let secret = SECRET
      let tokenArr = auth.split(" ");
      let token = tokenArr[1];

      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            errorMessage: "You need to login first!",
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({
        errorMessage: "You need to login first!",
      });
    }
  } catch (err) {
    res.status(401).send({ errorMessage: "Internal server error!" });
  }
}