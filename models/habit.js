const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  record: [
    {
      date: { type: Date},
      status: {
        type: String,
        enum: ["Done", "Not done", "None"],
        default: "None"
      }
    }
  ]
});

module.exports = mongoose.model("Habit", habitSchema);