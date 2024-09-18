const express = require("express");
const { getTodos, createTodo } = require("../controllers/todoController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/all", protect, getTodos);
router.post("/create", protect, createTodo);

module.exports = router;
