const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  // Check if the token is provided in the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userExists = await User.findById(decoded.id).select("-password");
      if (!userExists) {
        return res
          .status(404)
          .json({ message: "User not exists, Sign up please" });
      }

      // Get user from the token and attach it to the request object
      req.user = await User.findById(decoded.id).select("-password");

      // Move to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
