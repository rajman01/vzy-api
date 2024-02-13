import http from "http";
import dependencies from "./config/dependencies.js";
import HttpApp from "./delivery/http/app.js";
import config from "./config/env.js";

const start = async () => {
    // try to connect the database
    try {
        await dependencies.databaseService.connect();
    } catch (e) {
        dependencies.logger.error(e);
        process.exit(1);
    }

    // create http app
    const httpApp = new HttpApp({ dependencies, config });
    const webServer = httpApp.getServer();

    // create http server
    const httpServer = http.createServer(webServer);
    httpServer
        .listen(config.port, () => {
            dependencies.logger.info(`
      ################################################
      🪐  Server listening on port: ${config.port} 🪐
      ################################################
    `);
        })
        .on("error", async err => {
            dependencies.logger.error(err);
            await dependencies.databaseService.disconnect();
            process.exit(1);
        });
};

start()
    .then(() => {
        dependencies.logger.info("Starting server...");
    })
    .catch(err => {
        dependencies.logger.error(err);
        process.exit(1);
    });
