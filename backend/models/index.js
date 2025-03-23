const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;

module.exports = db;
