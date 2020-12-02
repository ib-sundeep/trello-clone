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

boardController.list = (req, res, next) => {
  Board.find().exec((error, boards) => {
    if (error) {
      res.status(500).send({ error: "Something went wrong! Try again later" });
    } else {
      res.json({
        boards: boards.map(board => board.serialize())
      });
    }
  });
};

boardController.find = async (req, res) => {
  const { slug } = req.params;
  const board = await Board.findOne({ slug }).exec();
  try {
    if (board) {
      const lists = await board.lists();
      const tasks = await board.tasks();
      res.json({
        board: board.serialize(),
        lists: lists.reduce((o, v) => {
          o[v._id.toString()] = v.serialize();
          return o;
        }, {}),
        tasks: tasks.reduce((o, v) => {
          o[v._id.toString()] = v.serialize();
          return o;
        }, {})
      });
    } else {
      res.status(404).send({ error: "No such board exists!" });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = boardController;
