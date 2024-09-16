const express = require("express");
const router = express.Router();

// Example Route
router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

module.exports = router;
