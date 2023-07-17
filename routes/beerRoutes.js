const express = require("express");
const router = express.Router();
const beerController = require("../controllers/beerController");
const { expressjwt: checkJwt } = require("express-jwt");

// router.use(
//   checkJwt({
//     secret: process.env.SESSION_SECRET,
//     algorithms: ["HS256"],
//   }),
// );
router.get("/", beerController.index);
router.get("/:id", beerController.show);
router.get("/", beerController.create);
router.post("/", beerController.store);
router.get("/editar/:id", beerController.edit);
router.patch("/:id", beerController.update);
router.delete("/:id", beerController.destroy);

module.exports = router;
