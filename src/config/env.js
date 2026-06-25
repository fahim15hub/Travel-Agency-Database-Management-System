import "dotenv/config";

const required = ["DATABASE_URL", "JWT_SECRET"];

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: parseInt(process.env.PORT ?? "3000", 10),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
    FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:5173",
    BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS ?? "10", 10),
};
export default env;