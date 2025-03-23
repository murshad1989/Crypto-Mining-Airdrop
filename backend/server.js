const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
