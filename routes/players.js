const express = require("express");
const router = express.Router();
const playerController = require("../controllers/").player;

/* GET users listing. */
router.get("/", playerController.all);

router.post("/", playerController.create);

router.get("/:id", playerController.findById);

router.put("/:id", playerController.update);

router.delete("/:id", playerController.delete);

module.exports = router;
