import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";


export const verifyToken = (req, res, next) => {
    console.log("Cookies Received:", req.cookies); // 🔥 Debugging

    const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        console.log("No Token Found");
        return next(errorHandler(401, 'You need to login'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Invalid Token");
            return next(errorHandler(403, "Token is not valid"));
        }
        console.log("Verified User:", user);
        req.user = user;
        next();
    });
};
