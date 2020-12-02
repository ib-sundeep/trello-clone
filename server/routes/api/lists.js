const express = require("express");
const router = express.Router();
const listController = require("../../controllers/listController");

router.post("/", listController.create);

router.put("/move", listController.move);

module.exports = router;
