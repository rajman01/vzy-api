import express from "express";
import stripe from "./stripe.js";

export default (app, dependencies, config) => {
    const router = express.Router();

    app.use("/webhook", router);
    stripe(router, dependencies, config);
};
