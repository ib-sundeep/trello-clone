const express = require("express");
const router = express.Router();
const boardController = require("../../controllers/boardController");

router.get("/:slug", boardController.find);

router.get("/", boardController.list);

router.post("/", boardController.create);

module.exports = router;
