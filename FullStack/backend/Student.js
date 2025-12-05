const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: String
}, { collection: "students" });

module.exports = mongoose.model("Student", studentSchema);
