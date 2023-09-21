const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Authentication failed" });
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
