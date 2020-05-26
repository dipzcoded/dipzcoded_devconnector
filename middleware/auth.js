const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  //  Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!!" });
  }

  // verify the token

  try {
    //  getting the payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // setting req.user to have the payload user id
    req.user = decoded.user;

    // final process
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
