const Sequelize = require("sequelize");
const os = require("os");
const fs = require("fs");
const homeDir = os.homedir();

// make sure the directory exists

const folder = "micriobioDB";

if (!fs.existsSync(homeDir + "/" + folder)) {
  fs.mkdirSync(homeDir + "/" + folder);
}

const pathName = homeDir + "/" + folder + "/" + "database.sqlite";

const sequelize = new Sequelize("microbiodb", "admin", "root", {
  dialect: "sqlite",
  storage: process.env.NODE_ENV === "dev" ? __dirname + "/../database.sqlite" : pathName,
  logging: process.env.NODE_ENV === "dev" ? console.log : false,
});

module.exports = sequelize;
