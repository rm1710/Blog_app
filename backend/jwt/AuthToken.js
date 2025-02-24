import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  await User.findByIdAndUpdate(userId, { token });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    path: "/",
  });
  return token;
};

export default createTokenAndSaveCookies;