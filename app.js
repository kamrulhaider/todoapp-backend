require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Start server
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
