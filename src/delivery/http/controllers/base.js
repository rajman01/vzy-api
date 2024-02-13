export default class BaseController {
    constructor({ logger }) {
        this.logger = logger;
    }

    handleSuccess(res, data = null, message = "Success", code = 200) {
        if (res.headersSent) return;

        // check if code is a string
        if (typeof code === "string") {
            code = 200;
        }

        res.status(code).json({
            error: false,
            message,
            code,
            data: data ? data : undefined,
        });
    }

    handleError(res, err, message = "Internal Server Error", code = 500) {
        if (res.headersSent) return this.logger.error(err);

        code = err.code || code;
        message = err.message || message;
        const errors = err.errors || undefined;

        // check if code is a string
        if (typeof code === "string") {
            code = 400;
        }

        this.logger.error(err);
        res.status(code).json({
            error: true,
            message,
            errors,
            code,
        });
    }
}
