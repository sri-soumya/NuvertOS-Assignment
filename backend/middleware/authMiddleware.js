const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    const { userId, isAdmin, exp } = jwt.verify(token, "secret");
    req.userId = userId;
    req.isAdmin = isAdmin;
    next();
  } catch {
    res.sendStatus(401);
  }
};
