import { Router } from "express";
import user from "./user.js";
import webhook from "./webhook/index.js";

export default (dependencies, config) => {
    const route = Router();

    user(route, dependencies);
    webhook(route, dependencies, config);

    return route;
};
