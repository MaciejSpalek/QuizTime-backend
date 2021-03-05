const router = require("express").Router();
const { register, login, getStatus } = require("../controllers/AuthController");

router.post("/register", register);
router.post("/login", login);
router.get("/", getStatus);

module.exports = router;
