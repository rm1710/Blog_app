import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {

    try {
        const token = req.cookies.jwt; // Ensure cookies middleware is enabled in your Express app
        console.log("Middleware: ", token);

        if (!token) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; // Attach the user to the request object
        next(); // Call the next middleware
    } catch (error) {
        console.error("Error occurring in Authentication: ", error);
        return res.status(401).json({ error: "User not authenticated" });
    }
};

export const isAdmin = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ error: `User with role ${req.user.role} is not allowed` });
            }
            next(); // Call the next middleware
        } catch (error) {
            console.error("Error in isAdmin middleware: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
};

