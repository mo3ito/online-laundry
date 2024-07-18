const jwt = require("jsonwebtoken");
const {jwtKey} = require("../endpoint")


const createToken = async (infos) => {
  const token = await jwt.sign(infos, jwtKey, { expiresIn: "10d" });
  return token;
};

module.exports = createToken;
