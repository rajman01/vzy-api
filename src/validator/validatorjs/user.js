import User, { UserValidator as UserValidatorInterface } from "../../entities/user.js";
import Base from "./base.js";
import { ValidationError } from "../../entities/error.js";

export default class UserValidator extends UserValidatorInterface {
    constructor() {
        super();
        this.base = new Base();
    }

    create(data) {
        this.base.validate(data, User.CREATE_RULES, (errs, status) => {
            if (!status) {
                throw new ValidationError("Validation Error", errs.errors);
            }
        });
    }

    update(data) {
        this.base.validate(data, User.UPDATE_RULES, (errs, status) => {
            if (!status) {
                throw new ValidationError("Validation Error", errs.errors);
            }
        });
    }

    login(data) {
        this.base.validate(data, User.LOGIN_RULES, (errs, status) => {
            if (!status) {
                throw new ValidationError("Validation Error", errs.errors);
            }
        });
    }
}
