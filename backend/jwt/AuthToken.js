import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  await User.findByIdAndUpdate(userId, { token });
  res.cookie("jwt", token, {
    httpOnly: true,
<<<<<<< HEAD
    secure: process.env.NODE_ENV === 'production',
=======
    secure: process.env.NODE_ENV === "production",
>>>>>>> 7ccb245f2ce203636afdd93e0309ae4e9fa7508c
    sameSite: "Strict",
  });
  return token;
};

export default createTokenAndSaveCookies;
