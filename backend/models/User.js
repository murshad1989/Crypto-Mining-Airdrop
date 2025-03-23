const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    twitterId: { type: DataTypes.STRING, allowNull: true, unique: true },
    walletAddress: { type: DataTypes.STRING, allowNull: true, unique: true },
}, {
    timestamps: true,
});

module.exports = User;
