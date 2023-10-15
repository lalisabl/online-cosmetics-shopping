const jwt = require("jsonwebtoken");
const secretKey = "key";

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;
  //console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authentication failed here" });
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Authentication failed down" });
    }

    req.userData = decodedToken;
    next();
  });
}

//for role based functionality
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.userData && req.userData.role === role) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
}

module.exports = { authenticateJWT, authorizeRole };
