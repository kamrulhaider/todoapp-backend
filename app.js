require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// Start server
connectDB();

// router import
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/", apiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
