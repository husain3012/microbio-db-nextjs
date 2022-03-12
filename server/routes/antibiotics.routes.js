const express = require("express");
const router = express.Router();
const { addNew, getAll, getPanel, deleteById } = require("../controllers/antibiotics.controllers");

router.post("/create", addNew);
router.delete("/delete/:id", deleteById);
router.get("/getAll", getAll);
router.get("/getPanel/:panel", getPanel);

module.exports = router;
