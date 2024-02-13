import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import BaseMiddleware from "./middlewares/base.js";

export default class App {
    constructor({ dependencies, config }) {
        this.dependencies = dependencies;
        this.server = express();
        this.routes = routes(dependencies, config);
        this.middlewares = new BaseMiddleware({ logger: dependencies.logger });
        this.registerMiddlewares();
        this.registerHandlers();
    }

    registerMiddlewares() {
        this.server.use(cors());
        this.server.use(
            express.json({
                verify: (req, res, buf) => {
                    req.rawBody = buf;
                },
            }),
        );
        this.server.use(this.middlewares.logRequest.bind(this.middlewares));
    }

    registerHandlers() {
        this.server.get("/", (req, res) => {
            res.json({ message: "Hi stranger", error: false });
        });

        this.server.get("/status", (req, res) => {
            res.status(200).end();
        });

        this.server.head("/status", (req, res) => {
            res.status(200).end();
        });

        this.server.use("/api", this.routes);
        this.server.use(this.middlewares.handleError.bind(this.middlewares));
        this.server.use(this.middlewares.handleNotFound.bind(this.middlewares));
    }

    getServer() {
        return this.server;
    }
}
