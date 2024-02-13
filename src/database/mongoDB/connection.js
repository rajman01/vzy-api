import mongoose from "mongoose";
import UserRepo from "./repositories/user.js";
mongoose.set("strictQuery", false);

export default class MongoDB {
    constructor({ logger, config }) {
        this.userRepo = new UserRepo();
        this.logger = logger;
        this.config = config;
    }

    async connect() {
        let count = 0;

        while (count <= 6) {
            try {
                await mongoose.connect(this.config.mongodbURI, {});
                this.logger.info("DB Connection successful!");
                break;
            } catch (e) {
                this.logger.error("database connection error, retrying...", e);
                count += 1;
                if (count > 5) {
                    this.logger.error("database connection error, not retrying", e);
                    throw e;
                }

                const backoff = Math.pow(2, count);
                await new Promise(resolve => setTimeout(resolve, backoff * 1000));
                this.logger.debug("backing off for " + backoff + " seconds");
            }
        }
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}
