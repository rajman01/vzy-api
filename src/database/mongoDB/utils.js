import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const convertToObjectId = id => {
    try {
        return new ObjectId(id);
    } catch (error) {
        return id;
    }
};

export const parseQuery = query => {
    if (query.id !== undefined) {
        query._id = convertToObjectId(query.id);
        delete query.id;
    }
    if (query.created_at !== undefined) {
        query.createdAt = query.created_at;
        delete query.created_at;
    }

    if (query.updated_at !== undefined) {
        query.updatedAt = query.updated_at;
        delete query.updated_at;
    }

    // can write more logic to parse the application query to the database query

    return query;
};
