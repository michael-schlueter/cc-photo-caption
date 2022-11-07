const crypto = require("crypto");

// @ts-ignore
const hashToken = (token) => {
  return crypto.createHash("sha512").update(token).digest("hex");
};

module.exports = { hashToken };
