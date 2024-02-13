import { Router } from "express";
import user from './user.js';

export default (dependencies, config) => {
    const route = Router();

    user(route, dependencies);

    return route;
};
