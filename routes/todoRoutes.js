const {
  getTodos,
  createTodo,
  getTodoByID,
} = require("../controllers/todoController");
const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.get("/all", protect, getTodos);
router.get("/:id", protect, getTodoByID);
router.post("/create", protect, createTodo);

module.exports = router;
