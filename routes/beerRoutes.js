const express = require("express");
const router = express.Router();
const beerController = require("../controllers/beerController");

router.get("/", beerController.index);
router.get("/:id", beerController.show);
router.get("/", beerController.create);
router.post("/", beerController.store);
router.get("/editar/:id", beerController.edit);
router.patch("/:id", beerController.update);
router.delete("/:id", beerController.destroy);

module.exports = router;
