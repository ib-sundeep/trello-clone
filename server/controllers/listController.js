let listController = {};
const List = require("../models/List");
const mongoose = require("mongoose");

listController.create = (req, res, next) => {
  if (req.body.boardId && req.body.name) {
    List.create(
      {
        board_id: new mongoose.mongo.ObjectId(req.body.boardId),
        name: req.body.name
      },
      (error, result) => {
        res.json(result);
      }
    );
  } else {
    throw new Error("Board Id and Board name is required to create a list");
  }
};

module.exports = listController;
