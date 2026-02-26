// Rate limiters guard API and authentication endpoints against abuse.
const rateLimit = require('express-rate-limit');

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000;
const apiMaxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 200);
const authMaxRequests = Number(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || 10);

const apiLimiter = rateLimit({
  windowMs,
  max: apiMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

const authLimiter = rateLimit({
  windowMs,
  max: authMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
});

module.exports = {
  apiLimiter,
  authLimiter,
};
