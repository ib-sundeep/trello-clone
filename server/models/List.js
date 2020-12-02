const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    sortOrder: { type: Number, required: true, unique: false },
    name: String
  },
  { timestamps: true }
);

// schema.plugin(uniqueValidator, { message: "is already taken" });

schema.pre("validate", async function(next) {
  if (!this.sortOrder) {
    const numListsInBoard = await this.constructor
      .count({ boardId: this.boardId })
      .exec();
    this.sortOrder = numListsInBoard + 1;
  }

  next();
});

schema.methods.move = async function(newSortOrder) {
  const currentSortOrder = this.sortOrder;
  if (newSortOrder === currentSortOrder) return;

  if (newSortOrder > currentSortOrder) {
    await this.constructor.updateMany(
      {
        sortOrder: { $gt: currentSortOrder, $lte: newSortOrder }
      },
      {
        $inc: {
          sortOrder: -1
        }
      }
    );
  } else if (newSortOrder < currentSortOrder) {
    await this.constructor.updateMany(
      {
        sortOrder: { $gte: newSortOrder, $lt: currentSortOrder }
      },
      {
        $inc: {
          sortOrder: 1
        }
      }
    );
  }

  await this.constructor.update({ id: this.id }, { sortOrder: newSortOrder });
  this.sortOrder = newSortOrder;
};

schema.methods.serialize = function() {
  return {
    id: this._id,
    boardId: this.boardId,
    name: this.name,
    sortOrder: this.sortOrder,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model("List", schema);
