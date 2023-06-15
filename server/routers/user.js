const register = require("../handlers/user/register");
const login = require("../handlers/user/login");
const getUser = require("../handlers/user/getUser");
const verify = require("../middlewares/verify");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get('/', [verify, getUser])


module.exports = router;
