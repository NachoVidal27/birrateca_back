const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);

router.get("/:id", userController.show);
router.post("/", userController.store);
router.post("/token", userController.createToken);
router.get("/editar/:id", userController.edit);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
