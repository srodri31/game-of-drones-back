const express = require("express");
const router = express.Router();
const gameController = require("../controllers/").game;

/* GET users listing. */
router.get("/", gameController.all);

router.post("/", gameController.create);

router.get("/:id", gameController.findById);

router.put("/:id", gameController.update);

router.delete("/:id", gameController.delete);

module.exports = router;
