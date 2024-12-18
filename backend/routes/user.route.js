const express = require("express");
const { register, login } = require("../controllers/user.cotroller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
