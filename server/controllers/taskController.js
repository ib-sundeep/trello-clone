const taskController = {};
const Task = require("../models/Task");
const mongoose = require("mongoose");

taskController.create = (req, res, next) => {
  Task.create(
    {
      list_id: new mongoose.Types.ObjectId(req.body.list_id),
      name: req.body.name,
      description: req.body.desc
    },
    (error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    }
  );
};

module.exports = taskController;
