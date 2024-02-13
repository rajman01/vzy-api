import { convertToObjectId } from "../utils.js";

export default class Base {
    constructor(model) {
        this.Model = model;
    }

    async create(data) {
        const res = await this.Model.create(data);
        return res.toObject({ virtuals: true });
    }

    async findOne(query = {}, { select = "" } = {}) {
        const res = await this.Model.findOne(query).select(select);
        return res ? res.toObject({ virtuals: true }) : null;
    }

    async findById(id, { select = "" } = {}) {
        return this.findOne({ _id: convertToObjectId(id) }, { select });
    }

    async findOneAndUpdate(query = {}, data) {
        const res = await this.Model.findOneAndUpdate(
            query,
            {
                $set: data,
            },
            {
                new: true,
            },
        );

        return res ? res.toObject({ virtuals: true }) : null;
    }
}
