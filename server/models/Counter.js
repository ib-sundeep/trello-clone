const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counter", CounterSchema);
