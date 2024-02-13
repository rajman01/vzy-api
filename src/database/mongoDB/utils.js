import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const convertToObjectId = id => {
    try {
        return new ObjectId(id);
    } catch (error) {
        return id;
    }
};
