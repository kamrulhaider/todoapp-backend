const Todo = require("../models/todoModel");

// Controller for getting todos based on the logged-in user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).select("-user");
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting todos based on the logged-in user
exports.getTodoByID = async (req, res) => {
  const { id } = req.params;
  const userID = req.user._id;

  try {
    const todo = await Todo.findById(id).populate("user", "-password");
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // Check if the user owns the todo
    if (todo.user._id.toString() !== userID.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to view this todo" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for creating a new todo
exports.createTodo = async (req, res) => {
  const { title, details, startingAt, endingAt } = req.body;
  // Validate data exists
  if (!details || !startingAt || !endingAt || !title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const todo = new Todo({
    title,
    user: req.user._id,
    details,
    startingAt,
    endingAt,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo saved successfully", data: newTodo });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
