const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const secretKey = crypto.randomBytes(32).toString('hex');
const secretKey =
  "9383e46767beb25b4edf2f80bd3492f3ce3e618cc83dff2658959730e1725984";
console.log(secretKey);

const generateToken = (userId) => {
  const wadu = jwt.sign({ userId }, secretKey);
  return wadu;
};

const verifyToken = (token) => {
  console.log("secret key", secretKey);
  return jwt.verify(token, secretKey);
};

module.exports = {
  generateToken,
  verifyToken,
};
