const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1] ;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message : err});
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
