export default class Payment {
    constructor({ id, created_at, updated_at, user, amount, currency, status, service_ref, checkout_url }) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.user = user;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.service_ref = service_ref;
        this.checkout_url = checkout_url;
    }

    static STATUS = {
        PENDING: "pending",
        SUCCESS: "success",
        FAILED: "failed",
    };

    static CURRENCY = {
        USD: "usd",
    };

    static DEFAULT_CURRENCY = Payment.CURRENCY.USD;
}

export class PaymentRepo {
    constructor() {}

    async findByServiceRef(service_ref) {
        return Promise.reject(new Error("not implemented"));
    }

    async findOneAndUpdate(filter, update) {
        return Promise.reject(new Error("not implemented"));
    }

    async create(payment) {
        return Promise.reject(new Error("not implemented"));
    }
}

export class PaymentService {
    constructor() {}

    async initiateTransaction({ user, amount, currency }) {
        return Promise.reject(new Error("not implemented"));
    }

    async verify(serviceRef) {
        return Promise.reject(new Error("not implemented"));
    }
}
