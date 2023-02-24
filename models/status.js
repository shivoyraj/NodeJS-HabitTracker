const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit"
    },
    date: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Done", "Not done", "None"],
        default: "None"
    }
});

module.exports = mongoose.model("Status", statusSchema);