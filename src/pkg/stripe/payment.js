import Stripe from "stripe";
import Payment, { PaymentService as PaymentServiceInterface } from "../../entities/payment.js";
import { BadRequestError } from "../../entities/error.js";

export default class PaymentService extends PaymentServiceInterface {
    constructor({ config }) {
        super();
        this.stripe = new Stripe(config.stripeSecretKey, null);
        this.config = config;
    }

    async initiateTransaction({ user, amount, currency }) {
        const data = {
            mode: "payment",
        }

        const lineItem = {
            price_data: {
                currency: currency ? currency.toLowerCase() : "usd",
                product_data: {
                    name: "Payment",
                    description: "coding test user payment",
                },
                unit_amount: amount * 100,
            },
            quantity: 1,
        };

        data.line_items = [lineItem];
        data.success_url = "https://vzy.co/"
        data.metadata = { user };

        const session = await this.stripe.checkout.sessions.create(data);

        console.log("session", session);

        return new Payment({
            user: user,
            amount: amount,
            currency: currency,
            status: Payment.STATUS.PENDING,
            service_ref: session.id,
            checkout_url: session.url,
        })
    }

    async verify(serviceRef) {
        // get session
        const session = await this.stripe.checkout.sessions.retrieve(serviceRef, {
            expand: ["payment_intent.payment_method"],
        });

        if (session.status !== "complete") {
            throw BadRequestError("Payment not complete");
        }

        const payment_intent = session.payment_intent;

        let status = Payment.STATUS.PENDING;

        if (
            payment_intent["status"] === "requires_payment_method" ||
            payment_intent["status"] === "requires_confirmation" ||
            payment_intent["status"] === "requires_action" ||
            payment_intent["status"] === "processing"
        ) {
            status = Payment.STATUS.PENDING;
        }

        if (payment_intent["status"] === "succeeded") {
            status = Payment.STATUS.SUCCESS;
        }

        if (payment_intent["status"] === "canceled") {
            status = Payment.STATUS.FAILED;
        }

        return new Payment({
            user: session.metadata.user,
            amount: payment_intent["amount"] / 100,
            currency: payment_intent["currency"],
            status: status,
            service_ref: session.id,
        });
    }
}