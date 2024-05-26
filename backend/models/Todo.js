const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        required: true,
    },
    identificator: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    favourited: {
        type: Boolean,
        default: false,
    },
    recurring: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Todo", todoSchema);
