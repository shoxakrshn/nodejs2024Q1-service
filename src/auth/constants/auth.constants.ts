export const authConstants = {
  salt: process.env.CRYPT_SALT,
  accessSecret: process.env.JWT_SECRET_KEY,
  refreshSecret: process.env.JWT_SECRET_REFRESH_KEY,
  accessExpire: process.env.TOKEN_EXPIRE_TIME,
  refreshExpire: process.env.TOKEN_REFRESH_EXPIRE_TIME,
};
