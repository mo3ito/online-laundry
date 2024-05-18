const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

const createToken = async (customerInfos) => {
  const token = await jwt.sign(customerInfos, jwtKey, { expiresIn: "10d" });
  return token;
};

module.exports = createToken;
