const Antibiotics = require("../models/antibiotics.model");
const axios = require("axios");
const _ = require("lodash");

exports.addNew = async (req, res) => {
  try {
    const { name, panel, shortName } = req.body;
    const isAlreadyExist = await Antibiotics.findOne({ where: { shortName: _.toLower(shortName) } });
    if (isAlreadyExist && isAlreadyExist.panel === panel) {
      return res.json({
        status: false,
        message: "Antibiotic already exist in the panel",
      });
    }
    const newAntibiotic = await Antibiotics.create({
      name,
      shortName: _.toLower(shortName),
      panel: _.camelCase(panel),
    });
    return res.status(201).json({
      success: true,
      data: newAntibiotic,
      message: "Added Successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to add new antibiotic!",
    });
  }
};

exports.deleteById = async (req, res) => {
  console.log(req.params.id);
  console.log("==========================");
  try {
    const { id } = req.params;
    const deletedAntibiotic = await Antibiotics.findOne({ where: { id } });
    // delete antibiotic
    await deletedAntibiotic.destroy();
    return res.status(200).json({
      success: true,
      data: deletedAntibiotic,
      message: "Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Failed to delete antibiotic!",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Antibiotics.findAll();
    const transformedResult = {
      staphylococcus: [],
      streptococcus: [],
      gramNegative: [],
      pseudomonas: [],
      others: [],
    };
    result.forEach((antibiotic) => {
      transformedResult[antibiotic.panel] ? transformedResult[antibiotic.panel].push(antibiotic) : transformedResult.others.push(antibiotic);
    });

    return res.json({
      status: true,
      message: "Retrieved Successfully!",
      data: transformedResult,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.getPanel = async (req, res) => {
  try {
    const foundPanel = await Antibiotics.findAll({ where: { panel: _.toLower(req.params.panel) } });
    if (foundPanel.length > 0) {
      return res.json({
        status: true,
        message: "Retrieved Successfully!",
        data: foundPanel,
      });
    }
    return res.json({
      status: false,
      message: "No panel found!",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
