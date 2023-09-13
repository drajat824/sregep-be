const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  if (!req.headers["authorization"]) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    token = req.headers["authorization"].split(" ")[1];
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
  if (!token) {
    res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, "sregep-masuk-secret", (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Token invalid" });
    }
    req.uuid = decoded.uuid;
    req.role = decoded.role;
  });
  next();
};

const authJWT = { verifyToken };

module.exports = authJWT;
