const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

const createToken = async (infos) => {
  const token = await jwt.sign(infos, jwtKey, { expiresIn: "10d" });
  return token;
};

module.exports = createToken;
