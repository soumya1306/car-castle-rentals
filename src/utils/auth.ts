import jwt from 'jsonwebtoken';

// JWT Configuration
const JWT_SECRET = (process.env.JWT_SECRET || 'your-very-secure-jwt-secret-key-change-in-production-use-at-least-32-characters') as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Admin credentials (must be provided via environment variables in production)
// Intentionally do NOT provide a hardcoded fallback here — failing open is unsafe.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

/**
 * Validates admin credentials
 * @param email - Admin email
 * @param password - Admin password
 * @returns Admin user object if valid, null if invalid
 */
export function validateAdminCredentials(email: string, password: string): AdminUser | null {
  // Validate input parameters
  if (!email || !password) {
    return null;
  }

  // Ensure admin credentials are configured on the server
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Admin credentials are not configured. Please set ADMIN_EMAIL and ADMIN_PASSWORD in your environment.');
    return null;
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      id: 'admin-1',
      email: ADMIN_EMAIL,
      role: 'admin'
    };
  }
  return null;
}

/**
 * Generates a JWT token for an admin user
 * @param user - Admin user object
 * @returns JWT token string
 */
export function generateToken(user: AdminUser): string {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId: user.id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload as object, JWT_SECRET as jwt.Secret, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'car-castle-rentals',
    subject: user.id
  } as jwt.SignOptions);
}

/**
 * Verifies and decodes a JWT token
 * @param token - JWT token string
 * @returns Decoded payload if valid, null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret, {
      issuer: 'car-castle-rentals'
    } as jwt.VerifyOptions) as JWTPayload;
    
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Extracts token from Authorization header
 * @param authHeader - Authorization header value
 * @returns Token string if valid format, null if invalid
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}

/**
 * Checks if a user has admin role
 * @param payload - JWT payload
 * @returns True if user is admin, false otherwise
 */
export function isAdmin(payload: JWTPayload): boolean {
  return payload.role === 'admin';
}

/**
 * Creates a refresh token (longer expiry for staying logged in)
 * @param user - Admin user object
 * @returns Refresh token string
 */
export function generateRefreshToken(user: AdminUser): string {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId: user.id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload as object, JWT_SECRET as jwt.Secret, {
    expiresIn: '30d', // Refresh token expires in 30 days
    issuer: 'car-castle-rentals-refresh',
    subject: user.id
  } as jwt.SignOptions);
}

/**
 * Verifies a refresh token
 * @param token - Refresh token string
 * @returns Decoded payload if valid, null if invalid
 */
export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret, {
      issuer: 'car-castle-rentals-refresh'
    } as jwt.VerifyOptions) as JWTPayload;
    
    return decoded;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}

/**
 * Gets authentication headers for API requests (client-side only)
 * @returns Headers object with Authorization token
 */
export function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') {
    return {};
  }
  
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return {};
  }
  
  return {
    'Authorization': `Bearer ${token}`
  };
}