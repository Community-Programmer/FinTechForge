import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { CorsOptions } from 'cors';

/**
 * Helmet Configuration
 * Sets secure HTTP headers to protect against common vulnerabilities
 */
export const helmetConfig = helmet({

  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"], 
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      manifestSrc: ["'self'"],
    },
  },

  frameguard: { action: 'deny' },

  hidePoweredBy: true,
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'same-origin' },
  hsts: {
    maxAge: 31536000, 
    includeSubDomains: true,
    preload: true,
  },
});

/**
 * Rate Limiting Configuration
 * Protects against brute-force and DoS attacks
 */
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true, 
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes',
    });
  },
});

/**
 * Stricter rate limiting for authentication endpoints
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, 
  handler: (req, res) => {
    res.status(429).json({
      error: 'Authentication rate limit exceeded',
      message: 'Too many authentication attempts from this IP, please try again later.',
      retryAfter: '15 minutes',
    });
  },
});

/**
 * CORS Configuration
 * Restricts cross-origin requests to authorized domains
 */
export const getCorsConfig = (): CorsOptions => {

  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : [process.env.FRONTEND_URL].filter(Boolean);

  return {
    origin: (origin, callback) => {

      if (!origin && process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
    ],
    exposedHeaders: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset'],
    maxAge: 86400,
  };
};

/**
 * Security Headers Middleware
 * Additional custom security headers
 */
export const additionalSecurityHeaders = (req: any, res: any, next: any) => {

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
 
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  
  next();
};