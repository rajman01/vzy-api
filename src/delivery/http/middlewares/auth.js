import UserUseCase from "../../../application/user.js";
import BaseMiddleware from "./base.js";
import { UnauthorizedError } from "../../../entities/error.js";

export default class AuthMiddleware extends BaseMiddleware {
    constructor({ logger, databaseService: { userRepo }, validatorService: { userValidator }, authService }) {
        super({ logger });
        this.userUseCase = new UserUseCase({
            logger,
            userRepo,
            userValidator,
            authService,
        });
    }

    async authenticate(req, res, next) {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new UnauthorizedError("Missing authorization header"));
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return next(new UnauthorizedError("Missing token"));
        }

        try {
            req.user = await this.userUseCase.authenticate(token);
            next();
        } catch (e) {
            this.handleError(e, req, res, next);
        }
    }
}
