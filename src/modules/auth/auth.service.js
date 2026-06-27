import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/db.js";
import env from "../../config/env.js";

/**
 * Register a new user
 * @param {Object} param0 - { name, email, password }
 * @returns {Object} { user, token }
 */
export async function register({ name, email, password }) {
    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, env.BCRYPT_ROUNDS);

    // Create user (default role CUSTOMER, auto-activate for now)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword,
            role: "CUSTOMER",
            isActivated: true,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActivated: true,
            createdAt: true,
        },
    });

    // Generate JWT
    const token = signToken(user.id);

    return { user, token };
}

/**
 * Login user
 * @param {Object} param0 - { email, password }
 * @returns {Object} { user, token }
 */
export async function login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    // Check if activated
    if (!user.isActivated) {
        const error = new Error("Account not activated");
        error.statusCode = 403;
        throw error;
    }

    const token = signToken(user.id);

    // Remove passwordHash from response
    const { passwordHash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
}

/**
 * Get current user by ID
 * @param {number} userId
 * @returns {Object} user without passwordHash
 */
export async function getMe(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            isActivated: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
}

/**
 * Sign JWT with user id as `sub`
 * @param {number} userId
 * @returns {string} JWT token
 */
function signToken(userId) {
    return jwt.sign({ sub: userId }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
    });
}