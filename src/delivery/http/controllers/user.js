import BaseController from "./base.js";
import UserUseCase from "../../../application/user.js";

export default class UserController extends BaseController {
    constructor({ logger, databaseService: { userRepo, paymentRepo }, validatorService: { userValidator }, authService, paymentService }) {
        super({ logger });
        this.userUseCase = new UserUseCase({
            logger,
            userRepo,
            userValidator,
            authService,
            paymentService,
            paymentRepo,
        });
    }

    async register(req, res) {
        try {
            const user = await this.userUseCase.create(req.body);
            this.handleSuccess(res, { user }, "User created");
        } catch (e) {
            this.handleError(res, e);
        }
    }

    async login(req, res) {
        try {
            const { user, token } = await this.userUseCase.login(req.body);
            this.handleSuccess(res, { user, token }, "User logged in");
        } catch (e) {
            this.handleError(res, e);
        }
    }

    async update(req, res) {
        try {
            const user = await this.userUseCase.update({ user_id: req.user.id, ...req.body });
            this.handleSuccess(res, { user }, "User updated");
        } catch (e) {
            this.handleError(res, e);
        }
    }

    async initiatePayment(req, res) {
        try {
            const payment = await this.userUseCase.initiatePayment(req.user.id);
            this.handleSuccess(res, { payment }, "Payment initiated");
        } catch (e) {
            this.handleError(res, e);
        }
    }
}
