const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slug = require("slug");
const List = require("./List");
const Task = require("./Task");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, lowercase: true, unique: true }
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator, { message: "is already taken" });

schema.pre("validate", function(next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

schema.methods.slugify = function() {
  this.slug =
    slug(this.name) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

schema.methods.serialize = function() {
  return {
    id: this._id,
    slug: this.slug,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

schema.methods.lists = async function(force = false) {
  if (!this._cachedLists || force) {
    const lists = await List.find({ boardId: this._id }).exec();
    this._cachedLists = lists;
  }
  return this._cachedLists;
};

schema.methods.tasks = async function() {
  const lists = await this.lists();
  const listIds = lists.map(o => o._id);
  return await Task.find({ listId: listIds }).exec();
};

module.exports = mongoose.model("Board", schema);
