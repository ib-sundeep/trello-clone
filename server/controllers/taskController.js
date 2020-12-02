const taskController = {};
const Task = require("../models/Task");
const mongoose = require("mongoose");

taskController.create = (req, res, next) => {
  Task.create(
    {
      listId: new mongoose.Types.ObjectId(req.body.listId),
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate
    },
    (error, result) => {
      if (error) throw error;
      else {
        res.json({ task: result.serialize() });
      }
    }
  );
};

module.exports = taskController;
