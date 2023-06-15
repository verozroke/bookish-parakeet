
const getUser = async (req, res) => {
    res.send(req.user)
  }
module.exports = getUser;
