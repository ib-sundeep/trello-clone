const express = require("express");
const router = express.Router();
const counterController = require("../../controllers/counterController");

router.get("/", counterController.find);

router.post("/", counterController.create);

router.delete("/:id", counterController.delete);

router.put("/:id/increment", counterController.increment);

router.put("/:id/decrement", counterController.decrement);

module.exports = router;
