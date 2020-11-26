const mongoose = require("mongoose");
const Board = require("../models/Board");
const BoardUser = require("../models/BoardUser");

let boardController = {};

boardController.test = (req, res, next) => {
  res.json("success");
};

boardController.create = (req, res, next) => {
  if (req.body.boardName && req.body.boardName.trim()) {
    Board.create(
      {
        name: req.body.boardName
      },
      (error, board) => {
        if (error) throw error;
        else {
          BoardUser.create(
            {
              boardId: board._id,
              userId: new mongoose.mongo.ObjectId("5fbfa7261cbc5cb62de0a289")
            },
            (error, _) => {
              if (error) {
                console.log({ error });
                res
                  .status(500)
                  .send({ error: "Something went wrong! Try again later" });
              } else {
                res.json({
                  board: board.serialize()
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(422).send({ error: "Board name cannot be blank" });
  }
};

boardController.find = (req, res, next) => {
  Board.find().exec((error, boards) => {
    if (error) throw error;
    res.json({
      boards: boards.map(board => board.serialize())
    });
  });
};

module.exports = boardController;
