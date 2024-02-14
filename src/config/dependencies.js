import MongoDB from "../database/mongoDB/connection.js";
import logger from "../pkg/logger/index.js";
import ValidatorJS from "../validator/validatorjs/index.js";
import config from "./env.js";
import AuthService from "../pkg/auth/index.js";
import StripePaymentService from "../pkg/stripe/payment.js";

export default (() => {
    return {
        logger: logger,
        databaseService: new MongoDB({ logger, config }),
        validatorService: new ValidatorJS(),
        authService: new AuthService({ config }),
        paymentService: new StripePaymentService({ config })
    };
})();
