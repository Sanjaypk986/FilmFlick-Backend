const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const userInfo = jwt.verify(req.cookies.token, process.env.JWT_KEY);
      req.user = userInfo
      next();
    } catch (error) {
      res.status(401).send("unauthoraized access!");
    }
  } else {
    res.status(401).send("unauthoraized access!");
  }
};

module.exports = protect;
