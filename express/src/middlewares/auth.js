import Employee from "../models/Employee";
import Admin from "../models/Admin";
import { getTokens } from "../functions/index";
import { SECRETKEY } from "../config/index";
import { verify } from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
  // Extract Authorization Header

  const token = req.headers.authorization;
  if (!token) {
    req.isAuth = false;
    return next();
  }
  try {
    const tokenValue = token.split(" ")[1]; //ok
    // console.log(tokenValue);
    const { id } = verify(tokenValue, SECRETKEY);
    // console.log(id);
    const user = await Employee.findById(id);
    if (!user) {
      const admin = await Admin.findById(id);
      if (!admin) {
        req.isAuth = false;
        return next();
      }
      console.log("admin");
      req.isAuth = true;
      req.admin = admin.id;
      return next();
    }

    req.user = user.id;
    req.isAuth = true;
    return next();
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  // no cookies
};
export default authMiddleWare;
