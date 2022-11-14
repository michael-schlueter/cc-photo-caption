const crypto = require("crypto");

export const hashToken = (token: string) => {
  return crypto.createHash("sha512").update(token).digest("hex");
};


