import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import env from "./config/env.js";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./modules/auth/auth.routes.js";
const app = express();
// Security
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
// Rate limiter (v8+)
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        standardHeaders: true,   // draft-6 RateLimit headers
        legacyHeaders: false,    // X-RateLimit-* headers
    })
);
// Logging
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Health check
app.get("/health", (_req, res) => {
    res.json({ status: "ok", env: env.NODE_ENV, ts: new Date().toISOString() });
});

 app.use("/api/v1/auth", authRouter);
// 404
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found." });
});
// Error handler
app.use(errorHandler);
export default app;
