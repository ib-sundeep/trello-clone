let listController = {};
const List = require("../models/List");
const mongoose = require("mongoose");

listController.create = (req, res, next) => {
  if (req.body.boardId && req.body.name) {
    List.create(
      {
        boardId: new mongoose.mongo.ObjectId(req.body.boardId),
        name: req.body.name
      },
      (error, result) => {
        if (error) {
          console.log({ error });
          res.status(500).send(error);
          return;
        }

        res.json({ list: result.serialize() });
      }
    );
  } else {
    res.status(422).send({ error: "Board name is not valis" });
  }
};

listController.move = async (req, res) => {
  const { listId, sortOrder } = req.body;
  console.log({ listId, sortOrder });
  if (listId && sortOrder) {
    const list = await List.findById(listId).exec();
    await list.move(sortOrder);
    res.json({ list: list.serialize() });
  } else {
    res.status(422);
  }
};

module.exports = listController;
