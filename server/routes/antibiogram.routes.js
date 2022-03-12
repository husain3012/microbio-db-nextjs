const express = require("express");
const router = express.Router();
const { bacteriaAntibiogram, trendAnalysis } = require("../controllers/antibiogram.controller");

router.post("/bacteria", bacteriaAntibiogram);
router.post("/trend_analysis", trendAnalysis);

module.exports = router;
