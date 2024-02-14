import BaseMiddleware from "./base.js";
import Stripe from "stripe";
import { UnauthorizedError } from "../../../entities/error.js";

export default class StripeMiddleware extends BaseMiddleware {
    constructor({ logger, config }) {
        super({ logger });
        this.config = config;
        this.stripe = new Stripe(config.stripeSecretKey, null);
    }

    validateRequest(req, res, next) {
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(
                req.rawBody,
                req.headers["stripe-signature"],
                this.config.stripeWebhookSecret,
            );
        } catch (e) {
            return next(new UnauthorizedError("Invalid request"));
        }

        req.body = {
            event: event.type,
            data: event.data.object,
        };

        next();
    }
}
