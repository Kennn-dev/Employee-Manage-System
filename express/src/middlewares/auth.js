import Employee from "../models/Employee";
import Admin from "../models/Admin";
import { getTokens } from "../functions/index";
import { SECRETKEY } from "../config/index";
import { verify } from "jsonwebtoken";

import consolaGlobalInstance, { success } from "consola";

const authMiddleWare = async (req, res, next) => {
  // Extract Authorization Header

  const token = req.headers.authorization;
  // success(`Got new token 💰 ${token}`);
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
      req.isAuth = true;
      success("admin");
      req.admin = admin.id;
      return next();
    }

    req.user = user.id;
    req.isAuth = true;
    success("user");
    return next();
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  // no cookies
};
export default authMiddleWare;
