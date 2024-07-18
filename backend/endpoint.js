const port = process.env.PORT;
const host = process.env.HOST;
const mongoUri = process.env.MONGO_URI;
const jwtKey = process.env.JWT_KEY;
const userNameMeliPayamak = process.env.USERNAME_MELIPAYAMAK;
const passwordMeliPayamak = process.env.PASSWORD_MELIPAYAMAK;
const bodyId = process.env.BODYID;
const adminKey = process.env.ADMIN_KEY;
const baseUrl = process.env.BASE_URL

module.exports = {
  port,
  host,
  mongoUri,
  jwtKey,
  userNameMeliPayamak,
  passwordMeliPayamak,
  bodyId,
  adminKey,
  baseUrl
};
