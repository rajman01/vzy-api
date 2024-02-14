import express from "express";
import UserController from "../controllers/user.js";
import AuthMiddleware from "../middlewares/auth.js";

export default (app, dependencies) => {
    const router = express.Router();
    const controller = new UserController(dependencies);
    const authMiddleware = new AuthMiddleware(dependencies);

    app.use("/user", router);
    router.post("/register", controller.register.bind(controller));
    router.post("/login", controller.login.bind(controller));
    router.put("/update", authMiddleware.authenticate.bind(authMiddleware), controller.update.bind(controller));
    router.get("/payment/initiate", authMiddleware.authenticate.bind(authMiddleware), controller.initiatePayment.bind(controller));
};
