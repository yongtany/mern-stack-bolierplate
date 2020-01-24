module.exports = {
  mongoURI:process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  sendGridUser: process.env.SENDGRID_USERNAME,
  sendGridPassword: process.env.SENDGRID_PASSWORD,
}