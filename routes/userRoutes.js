const express = require("express");
const {
  signup,
  login,
  deleteAccount,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/delete", protect, deleteAccount);

module.exports = router;
