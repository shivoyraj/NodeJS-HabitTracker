const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  record: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status"
    }
  ]
});

module.exports = mongoose.model("Habit", habitSchema);