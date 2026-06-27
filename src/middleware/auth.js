import jwt from "jsonwebtoken";
import env from "../config/env.js";
import prisma from "../config/db.js";
import { sendError } from "../utils/response.js";

export default async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return sendError(res, 401, "No token provided.");
        }

        const token = authHeader.split(" ")[1];

        let payload;
        try {
            payload = jwt.verify(token, env.JWT_SECRET);
        } catch (e) {
            const msg = e.name === "TokenExpiredError" ? "Token expired." : "Invalid token.";
            return sendError(res, 401, msg);
        }

        const user = await prisma.user.findUnique({
            where: { id: parseInt(payload.sub, 10) },  // Int id
            select: { id: true, email: true, role: true, isActivated: true },
        });

        if (!user || !user.isActivated) {
            return sendError(res, 401, "Account not found or not activated.");
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}