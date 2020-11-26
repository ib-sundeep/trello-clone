const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
    name: String,
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", schema);
