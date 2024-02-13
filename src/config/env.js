import dotenv from "dotenv";
const env = dotenv.config({ path: `./.env` });

// Set the NODE_ENV to 'development' by default  ,
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

if (env.error && !process.env.NODE_ENV.toLowerCase().includes("prod")) {
    dotenv.config({ path: `./.env.${process.env.NODE_ENV.toLowerCase()}` });
}

export const parsePemKey = key => {
    return key.split("\\n").join("\n");
};

export const port = parseInt(process.env.PORT, 10) || 3000;
export const jwtSecret = parsePemKey(process.env.JWT_SECRET);
export const mongodbURI = process.env.MONGO_URI;
export default {
    port,
    jwtSecret,
    mongodbURI,
};
