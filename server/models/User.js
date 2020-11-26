const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    password: String,
    boards: [{ type: mongoose.Schema.Types.ObjectId }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
