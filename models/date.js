const mongoose = require("mongoose");
const habitSchema = require('./habit')

const dateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  habits: [habitSchema]
});

module.exports = mongoose.model("Date", dateSchema);