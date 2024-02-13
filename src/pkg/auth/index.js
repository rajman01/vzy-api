import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default class AuthService {
    constructor({ config }) {
        this.config = config;
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    async verifyToken(token) {
        const payload = jwt.verify(token, this.config.jwtSecret);
        return payload.data;
    }

    async generateToken(payload, time = 60) {
        return jwt.sign({ data: payload }, this.config.jwtSecret, {
            expiresIn: time,
            algorithm: "ES256",
        });
    }
}
