const { registerAdmin, loginAdmin, sendRestLink } = require("../controller/admin.controller");

const router = require("express").Router();

router.post("/register", registerAdmin);
router.post("/login",loginAdmin)
router.get("/forget-password",sendRestLink)

module.exports = router;
