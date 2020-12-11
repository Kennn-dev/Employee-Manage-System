import Employee from "../models/Employee";
import Admin from "../models/Admin";
import { SECRETKEY } from "../config/index";
import { verify } from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
  // Extract Authorization Header
  const authHeader = req.get("Authorization");
  // console.log("authHeader", authHeader);
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // Extract the token and check for token
  const token = authHeader.split(" ")[1];
  // const token = authHeader;
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  try {
    // Verify the extracted token
    let decodedToken = verify(token, SECRETKEY);

    // If decoded token is null then set authentication of the request false
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }

    // If the user has valid token then Find the user by decoded token's id
    let authUser = await Employee.findById(decodedToken.id);
    if (!authUser) {
      let authAdmin = await Admin.findById(decodedToken.id);
      if (!authAdmin) {
        req.isAuth = false;
        return next();
      }
      req.admin = authAdmin;
      req.isAuth = true;
      return next();
    }

    req.isAuth = true;
    req.user = authUser;
    return next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};
export default authMiddleWare;
