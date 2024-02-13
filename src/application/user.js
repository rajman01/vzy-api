import User from "../entities/user.js";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../entities/error.js";

export default class UserUseCase {
    constructor({ logger, userRepo, authService, userValidator }) {
        this.logger = logger;
        this.userRepo = userRepo;
        this.authService = authService;
        this.userValidator = userValidator;
    }

    async create(data) {
        this.logger.info("UserUseCase.create");
        this.userValidator.create(data);

        const { email } = data;

        // check if user email already exists
        const checkEmail = await this.userRepo.findOne({ email });
        if (checkEmail) {
            throw new BadRequestError("Email already exists");
        }

        data.password = await this.authService.hashPassword(data.password);

        const user = await this.userRepo.create(data);
        delete user.password;
        return user;
    }

    async login(data) {
        this.logger.info("UserUseCase.login");
        this.userValidator.login(data);

        const { email, password } = data;

        // get user by email
        const user = await this.userRepo.findOne({ email }, { select: "+password" });
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const isPasswordValid = await this.authService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestError("Invalid password");
        }

        // generate token
        const token = await this.authService.generateToken({ id: user.id.toString(), email: user.email });

        delete user.password;
        return { user, token };
    }

    async authenticate(token) {
        this.logger.info("UserUseCase.authenticate");

        let user;
        try {
            user = await this.authService.verifyToken(token);
        } catch (e) {
            throw new UnauthorizedError("Session expired");
        }

        if (!user) {
            throw new UnauthorizedError("Invalid token");
        }

        return user;
    }

    async update(data) {
        this.logger.info("UserUseCase.update");
        this.userValidator.update(data);

        const { user_id } = data;

        const user = await this.userRepo.findOneAndUpdate({ id: user_id }, data);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    }
}
