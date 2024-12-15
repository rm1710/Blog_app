import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

//Authentication

export const isAuthenticated = async(req,res,next )=> {
    try{
        const token =  req.cookies.token;
        console.log("Middleware: ",token);
        if(!token){
            return res.status(401).json({error:"user not authenticated"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        req.user = User;
        next();
    }catch(error){
        console.log("Error occuring in Authentication: "+error);
        return res.status(401).json({error:"user not authenticated"});
    }
};