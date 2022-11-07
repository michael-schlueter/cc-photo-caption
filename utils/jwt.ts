const jwt = require("jsonwebtoken");

// @ts-ignore
const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "5m",
  });
};

// @ts-ignore
const generateRefreshToken = (user, jti) => {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "8h",
    }
  );
};

// @ts-ignore
const generateTokens = (user, jti) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
}