import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "warn", "error"]
                : ["warn", "error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("✅ DB Connected via Prisma");
    } catch (error) {
        console.error(`❌ Database connection error: ${error.message}`);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
    console.log("🔌 DB Disconnected");
};

export { prisma, connectDB, disconnectDB };
export default prisma;