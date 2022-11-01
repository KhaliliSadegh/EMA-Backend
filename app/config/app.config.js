const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DB: process.env.DB_NAME,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_Family: process.env.ADMIN_Family,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_POSITION: process.env.ADMIN_POSITION,
  jwt_secret: process.env.jwt_secret
};