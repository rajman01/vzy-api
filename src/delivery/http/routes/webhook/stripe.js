import express from "express";
import StripeController from "../../controllers/webhook/stripe.js";
import StripeMiddleware from "../../middlewares/stripe.js";

export default (app, dependencies, config) => {
    const router = express.Router();

    const controller = new StripeController(dependencies);
    const middleware = new StripeMiddleware({ logger: dependencies.logger, config });

    app.use("/stripe", router);
    router.use(middleware.validateRequest.bind(middleware));
    router.post("/", controller.handleEvent.bind(controller));
};
