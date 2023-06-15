const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.get("Authorization") && req.get("Authorization").split(" ")[1];
  // Authorization: "Bearer <Token>" => ["Bearer", "<Token>"]
  if (!token) {
    return res.json({
      success: false,
      message: "Bad token",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    if (decoded) {
      req.user = decoded;
      return next();
    }
    return res.json({
      success: false,
      message: "Bad token",
    });
  }
   catch (err) {
    return res.json({
      success: false,
      message: "Bad token",
    });
  }
};

module.exports = verify;
