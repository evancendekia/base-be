const VALID_TOKENS = [
  "Bearer TOKEN_SYSTEM_A_123",
  "Bearer TOKEN_SYSTEM_B_456"
];

export const verifyBearerToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Missing Authorization header"
    });
  }

  if (!VALID_TOKENS.includes(authHeader)) {
    return res.status(403).json({
      success: false,
      message: "Invalid token"
    });
  }

  next();
};
