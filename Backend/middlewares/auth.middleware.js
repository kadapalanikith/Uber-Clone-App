const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports.authUser = async (req, res, next) => { 
    const token = req.cookies.token || req.header.authorization.split(" ")[1];


    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    
    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is blacklisted. Please log in again." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
}
