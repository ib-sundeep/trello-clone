const mongoose = require("mongoose");

const list = new mongoose.Schema(
  {
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    name: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", list);
