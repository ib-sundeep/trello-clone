const express = require("express");
const router = express.Router();
const boardController = require("../../controllers/boardController");

router.get("/", boardController.find);

router.post("/", boardController.create);

module.exports = router;
