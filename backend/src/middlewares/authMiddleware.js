import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'
import dotenv from 'dotenv';

dotenv.config();

export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
            res.status(401).json({ msg: "Invalid Token" });
            return
        };

        const token = authHeader.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded._id;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            res.status(401).json({ msg: "User not found" });
            return
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(404).json({ message: "Page not found" });
    }
}