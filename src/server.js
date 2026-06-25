import env from "./config/env.js";
import app from "./app.js";
import { connectDB, disconnectDB } from "./config/db.js";

const PORT = env.PORT;

async function start() {
    await connectDB();

    const server = app.listen(PORT, () => {
        console.log(`[server] running in ${env.NODE_ENV} mode on port ${PORT}`);
    });

    async function shutdown(signal) {
        console.log(`\n[server] ${signal} received — shutting down gracefully`);
        server.close(async () => {
            await disconnectDB();
            process.exit(0);
        });
        setTimeout(() => process.exit(1), 10_000);
    }

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT",  () => shutdown("SIGINT"));
}

start();
