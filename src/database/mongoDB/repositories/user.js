import User, { UserRepo as UserRepoInterface } from "../../../entities/user.js";
import UserModel from "../models/user.js";
import Base from "./base.js";

export default class UserRepo extends UserRepoInterface {
    constructor() {
        super();
        this.base = new Base(UserModel);
    }

    async create(user) {
        return new User(await this.base.create(user));
    }

    async findOne(filter, opts) {
        const user = await this.base.findOne(filter, opts || {});
        return user ? new User(user) : null;
    }

    async findOneAndUpdate(filter, update) {
        const user = await this.base.findOneAndUpdate(filter, update);
        return user ? new User(user) : null;
    }
}
