const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/auth.controllers");

router.post("/login", login);
router.post("/signup", signup);
// router.get("/auth/signout", signout);

module.exports = router;
