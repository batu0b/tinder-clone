const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.send("You need to log in");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken._id;
    next();
  } catch (ex) {
    res.status(401).send("Invalid account");
  }
};
