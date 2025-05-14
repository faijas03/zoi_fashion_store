const { blacklist } = require("./jwtvalidation");
const registerschema = require("../model/register_schema");
exports.blacklistjwt = async (req, res, next) => {
  try {
    const token = req.user.token;
    const user = await registerschema
      .findById(req.user.userId)
      .select("username -_id");
    const username = user.username;
    console.log(username);
    if (!token) return res.status(404).json({ error: "NO valid token" });
    blacklist.add(token);
    res.status(200).json({
      message: `${username} logout succesfully,token moved to blacklist`,
    });
  } catch (error) {
    res.status(400).json({ error: "logout failed" });
  }
};
