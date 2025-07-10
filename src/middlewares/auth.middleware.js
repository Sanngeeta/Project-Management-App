const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate JWT tokens for protected routes.
 */
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present
    if (!authHeader) {
      return res.status(401).json({
        status: 401,
        message: 'Authorization header missing. Access denied.',
      });
    }

    // Expect header format: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'JWT token missing from Authorization header.',
      });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next(); 
  } catch (error) {
    console.error('JWT verification error:', error);

    return res.status(401).json({
      status: 401,
      message:
        error.name === 'TokenExpiredError'
          ? 'JWT token has expired. Please login again.'
          : 'Invalid or malformed token. Authentication failed.',
    });
  }
};
