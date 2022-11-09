const crypto = require("crypto");

// @ts-ignore
export const hashToken = (token) => {
  return crypto.createHash("sha512").update(token).digest("hex");
};


