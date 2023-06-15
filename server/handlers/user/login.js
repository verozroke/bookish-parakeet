const validateUser = require("../../validators/user");
const User = require("../../models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.json({
      success: false,
      message: error.details[0].message,
    });
  }
  const user = await User.findOne({ login: req.body.login });
  if (!user) {
    return res.json({
      success: false,
      message: "login and password do not match",
    });
  }
  const verifyPass = await argon2.verify(user.password, req.body.password);
  if (!verifyPass) {
    return res.json({
      success: false, 
      message: "login and password do not match",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      login: user.login,
    },
    process.env.SECRET, {expiresIn: "12h"}
  );
  return res.json({
    success: true,
    token,
    user,
  });
};

module.exports = login;
