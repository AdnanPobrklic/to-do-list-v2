const mongoose = require("mongoose");
const dbUri = process.env.DB_URI || "mongodb://localhost:27017";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbUri);
    } catch (err) {
        process.exit(1);
    }
};

module.exports = connectDB;
