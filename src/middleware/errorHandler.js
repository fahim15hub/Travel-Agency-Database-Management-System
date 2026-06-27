import { Prisma } from "@prisma/client";
import { sendError } from "../utils/response.js";

export default function errorHandler(err, req, res, next) {
    console.error(`[error] ${req.method} ${req.originalUrl}`, err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002": {
                const field = err.meta?.target ?? "field";
                return sendError(res, 409, `A record with that ${field} already exists.`);
            }
            case "P2025":
                return sendError(res, 404, "Record not found.");
            case "P2003":
                return sendError(res, 400, "Foreign key constraint failed.");
            default:
                return sendError(res, 400, "Database error.", { code: err.code });
        }
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        return sendError(res, 400, "Invalid data sent to the database.");
    }

    const status  = err.statusCode  ?? err.status ?? 500;
    const message = err.message ?? "Internal Server Error";
    const detail = (process.env.NODE_ENV !== "production" && status >= 500) ? err.stack : undefined;

    return sendError(res, status, message, detail);
}