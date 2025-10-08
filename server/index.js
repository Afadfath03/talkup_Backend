const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const sequelize = require("./config/database");

app.use(express.json());

// Cek koneksi database
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Simple route
app.get("/", (req, res) => {
  res.send("TalkUp API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
