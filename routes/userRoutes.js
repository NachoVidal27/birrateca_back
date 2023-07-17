const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/", userController.index);
router.post("/", userController.store);
router.post("/token", userController.createToken);

// router.use(
//   checkJwt({
//     secret: process.env.SESSION_SECRET,
//     algorithms: ["HS256"],
//   }),
// );

router.get("/:id", userController.show);
router.get("/editar/:id", userController.edit);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
