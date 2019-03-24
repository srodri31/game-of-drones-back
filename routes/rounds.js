const express = require("express");
const router = express.Router();
const roundController = require("../controllers/").round;

/* GET users listing. */
router.get("/", roundController.all);

router.post("/games/:gameId", roundController.create);

router.get("/games/:gameId", roundController.findByGame);

router.get("/:id", roundController.findById);

router.put("/:id", roundController.update);

router.delete("/:id", roundController.destroy);

module.exports = router;
