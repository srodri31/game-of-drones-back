const express = require("express");
const router = express.Router();
const gameController = require("../controllers/").game;

/* GET users listing. */
router.get("/", gameController.all);

router.post("/", gameController.create);

router.get("/:id", gameController.findById);

router.put("/:id", gameController.update);

router.delete("/:id", gameController.destroy);

router.get("/:id/winner", gameController.getWinner);

router.post("/:id/winner", gameController.setWinner);

module.exports = router;
