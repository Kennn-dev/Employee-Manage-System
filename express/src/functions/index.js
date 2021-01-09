import { verify } from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import moment from "moment";
import { SECRETKEY, REFRESHKEY } from "../config/index";

export const getUser = ({ token }) => {
  const user = verify(token, SECRETKEY);
  if (!user) throw new Error("u must be login first");
  return user;
};

export const getTokens = ({ id, username, position }) => {
  const accessToken = sign(
    {
      id,
      position,
      username,
    },
    SECRETKEY,
    { expiresIn: "1d" }
  );

  const refreshToken = sign(
    {
      id,
      position,
      username,
    },
    REFRESHKEY,
    { expiresIn: "10s" }
  );

  return { accessToken, refreshToken };
};

export const formatToDate = (string) => {
  const rs = moment().format(string);
  return rs;
};
