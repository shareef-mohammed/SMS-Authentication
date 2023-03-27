const bcrypt = require("bcrypt");

function hashOTP(OTP) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(OTP, salt);
}

function compareOTP(raw, hash) {
  return bcrypt.compareSync(raw, hash);
}

module.exports = {
  hashOTP,
  compareOTP,
};