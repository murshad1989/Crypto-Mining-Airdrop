const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../models");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });

        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const metamaskLogin = async (req, res) => {
    try {
        const { walletAddress } = req.body;

        let user = await User.findOne({ where: { walletAddress } });
        if (!user) {
            user = await User.create({ walletAddress });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const twitterLogin = async (req, res) => {
    try {
        const { twitterId, name } = req.body;

        let user = await User.findOne({ where: { twitterId } });
        if (!user) {
            user = await User.create({ twitterId, name });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    register,
    login,
    logout,
    metamaskLogin,
    twitterLogin,
};
