const limitter = require("express-rate-limit");

function rateLimitter(time, maxReq, message) {
  let limit = limitter({
    windowMs: time || 15 * 60 * 1000,
    max: maxReq || 50,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      message: message || "Too many requests, please try again later.",
      error: "TOO_MANY_REQUESTS",
    },
  });

  return limit;
}

module.exports = rateLimitter;
