export default class User {
    constructor({
        id,
        first_name,
        last_name,
        email,
        phone,
        gender,
        date_of_birth,
        password,
        status,
        created_at,
        updated_at,
    }) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.date_of_birth = date_of_birth;
        this.password = password;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static STATUS = {
        PENDING: "pending",
        PAID: "paid",
    };

    static GENDER = {
        MALE: "male",
        FEMALE: "female",
    };

    static CREATE_RULES = {
        first_name: "required|string",
        last_name: "required|string",
        email: "required|email",
        password: "required|string",
        phone: "string|phone",
    };

    static UPDATE_RULES = {
        user_id: "required|string",
        first_name: "string",
        last_name: "string",
        phone: "string|phone",
        gender: `string|in:${Object.values(User.GENDER).join(",")}`,
        date_of_birth: "required|string|date_format:DD/MM/YYYY",
    };

    static LOGIN_RULES = {
        email: "required|email",
        password: "required|string",
    };
}

export class UserRepo {
    constructor() {}

    async create(user) {
        return Promise.reject(new Error("not implemented"));
    }

    async findOne(filter, opts) {
        return Promise.reject(new Error("not implemented"));
    }

    async findById(id, opts) {
        return Promise.reject(new Error("not implemented"));
    }

    async findOneAndUpdate(filter, update, opts) {
        return Promise.reject(new Error("not implemented"));
    }
}

export class UserValidator {
    constructor() {}

    async create(user) {
        return Promise.reject(new Error("not implemented"));
    }

    async update(user) {
        return Promise.reject(new Error("not implemented"));
    }

    async login(user) {
        return Promise.reject(new Error("not implemented"));
    }
}
