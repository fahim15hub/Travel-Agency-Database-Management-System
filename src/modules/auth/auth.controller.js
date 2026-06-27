import { validationResult } from "express-validator";
import * as authService from "./auth.service.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export async function register(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return sendError(res, 400, "Validation failed.", errors.array());
        const result = await authService.register(req.body);
        sendSuccess(res, 201, "Registered successfully.", result);
    } catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return sendError(res, 400, "Validation failed.", errors.array());
        const result = await authService.login(req.body);
        sendSuccess(res, 200, "Logged in.", result);
    } catch (err) {
        next(err);
    }
}

export async function getMe(req, res, next) {
    try {
        const user = await authService.getMe(req.user.id);
        sendSuccess(res, 200, "User fetched.", user);
    } catch (err) {
        next(err);
    }
}