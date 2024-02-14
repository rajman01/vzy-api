import BaseController from "../base.js";
import UserUseCase from "../../../../application/user.js";

export default class WebhookStripeController extends BaseController {
    constructor({ logger, databaseService: { userRepo, paymentRepo }, paymentService }) {
        super({ logger });
        this.userUseCase = new UserUseCase({ logger, userRepo, paymentRepo, paymentService });
    }

    async handleEvent(req, res) {
        try {
            const { event, data } = req.body;
            switch (event) {
                case "checkout.session.completed": // it can also be payment_intent.succeeded depending on the payment flow
                    await this.userUseCase.verifyPayment(data.id);
                    break;
                default:
                    break;
            }
            this.handleSuccess(res, null, "Event handled");
        } catch (e) {
            this.handleError(res, e);
        }
    }
}
