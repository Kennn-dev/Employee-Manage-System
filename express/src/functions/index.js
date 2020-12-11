import { success, error } from "consola";
import { verify } from "jsonwebtoken";

import { SECRETKEY } from "../config/index";

export const checkMail = () => {};

export const sendMail = () => {};

export const getUser = ({ token }) => {
  const user = verify(token, SECRETKEY);
  if (!user) throw new Error("u must be login first");
  return user;
};
