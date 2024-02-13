import Base from "./base.js";
import UserValidator from "./user";

export default class ValidatorJS {
    constructor() {
        Base.registerCustomRules();
        this.userValidator = new UserValidator();
    }
}
