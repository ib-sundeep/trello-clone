const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
    name: String,
    description: String,
    dueDate: Date
  },
  { timestamps: true }
);

schema.methods.serialize = function() {
  return {
    id: this._id,
    listId: this.listId,
    name: this.name,
    description: this.description,
    dueDate: this.dueDate,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model("Task", schema);
