import Payment, { PaymentRepo as PaymentRepoInterface } from "../../../entities/payment.js";
import PaymentModel from "../models/payment.js";
import Base from "./base.js";

export default class PaymentRepo extends PaymentRepoInterface {
    constructor() {
        super();
        this.base = new Base(PaymentModel);
    }

    async create(payment) {
        return new Payment(await this.base.create(payment));
    }

    async findByServiceRef(serviceRef) {
        const payment = await this.base.findOne({ service_ref: serviceRef });
        return payment ? new Payment(payment) : null;
    }

    async findOneAndUpdate(filter, update) {
        const payment = await this.base.findOneAndUpdate(filter, update);
        return payment ? new Payment(payment) : null;
    }
}
