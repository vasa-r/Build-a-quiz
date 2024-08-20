const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(404).json({
        success: false,
        message: "Auth header not fond",
      });
    }

    const items = authHeader.split(" ");
    if (items.length !== 2 || items[0] !== "Bearer") {
      return res.status(406).json({
        success: false,
        message: "Invalid Authorization header format",
      });
    }

    const token = items[1];
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found",
      });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded.userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Token verification failed",
    });
  }
};

module.exports = verifyToken;
