const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

//routes
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Good to go",
  });
});

app.listen(PORT, () => {
  console.log("server is up and running");
});
