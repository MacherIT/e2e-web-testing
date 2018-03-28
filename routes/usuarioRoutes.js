var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController");
var guardian = require("../config/guardian");

/*
 * GET
 */
// router.get('/', usuarioController.list);
router.get("/", guardian.midJWT, guardian.secure, usuarioController.list);

/*
 * GET
 */
router.post("/login", usuarioController.login);

// router.get('/perfil', guardian.midJWT, guardian.secure, usuarioController.show);

router.get("/:id", guardian.midJWT, guardian.secure, usuarioController.show);

/*
 * POST
 */
router.post("/", usuarioController.create);

/*
 * PUT
 */
router.put(
  "/perfil",
  guardian.midJWT,
  guardian.secure,
  usuarioController.update
);

/*
 * DELETE
 */
router.delete(
  "/perfil",
  guardian.midJWT,
  guardian.secure,
  usuarioController.remove
);

module.exports = router;
