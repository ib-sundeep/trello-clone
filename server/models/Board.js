const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slug = require("slug");

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

module.exports = mongoose.model("Board", schema);
