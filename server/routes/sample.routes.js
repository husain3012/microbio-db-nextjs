const express = require("express");
const router = express.Router();
const { createSample, getSample, getByDate, updateSample, generateReport, findSample, randomSampleGen } = require("../controllers/sample.controllers");

router.post("/create", createSample);
router.post("/update", updateSample);
router.post("/search", findSample);
router.post("/generate_samples", randomSampleGen);

router.get("/getByDate", getByDate);

router.get("/get/:sampleId", getSample);
router.get("/report/:sampleId", generateReport);

module.exports = router;
