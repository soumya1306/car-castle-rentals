/**
 * Domain Utilities for Car Castle Rentals
 * Handles domain whitelisting and CORS configuration
 */

// Get allowed origins from environment or use defaults
export const getAllowedOrigins = (): string[] => {
  const envOrigins = process.env.NEXT_PUBLIC_ALLOWED_ORIGINS;
  
  if (envOrigins) {
    return envOrigins.split(',').map(origin => origin.trim());
  }
  
  // Default allowed origins
  return [
    'https://carcastlegoa.com',
    'https://www.carcastlegoa.com',
    'http://localhost:3000',
    'http://localhost:3001',
  ];
};

// Check if origin is allowed
export const isOriginAllowed = (origin: string | null): boolean => {
  if (!origin) return false;
  
  const allowedOrigins = getAllowedOrigins();
  return allowedOrigins.includes(origin);
};

// Get primary domain
export const getPrimaryDomain = (): string => {
  return process.env.NEXT_PUBLIC_DOMAIN || 'carcastlegoa.com';
};

// Generate CORS headers
export const getCorsHeaders = (origin: string | null) => {
  const isAllowed = isOriginAllowed(origin);
  const allowedOrigins = getAllowedOrigins();
  
  return {
    'Access-Control-Allow-Origin': isAllowed && origin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-User-Id, X-User-Email, X-User-Role',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
};

// Check if request is from whitelisted domain
export const isValidDomain = (hostname: string | null): boolean => {
  if (!hostname) return false;
  
  const allowedDomains = [
    'carcastlegoa.com',
    'www.carcastlegoa.com',
    'localhost',
  ];
  
  return allowedDomains.some(domain => 
    hostname === domain || hostname.endsWith(`.${domain}`)
  );
};

// Get canonical URL for the domain
export const getCanonicalUrl = (path: string = ''): string => {
  const domain = getPrimaryDomain();
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullDomain = domain.startsWith('localhost') ? `${protocol}://${domain}:3000` : `https://${domain}`;
  
  return `${fullDomain}${path.startsWith('/') ? path : `/${path}`}`;
};