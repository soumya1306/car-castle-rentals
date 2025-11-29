/**
 * Edge Runtime Compatible Auth Utilities
 * 
 * This module provides JWT token verification that works with Next.js Edge Runtime
 * by using the Web Crypto API instead of Node.js crypto module.
 */

import { JWTPayload } from './auth';

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-jwt-secret-key-change-in-production-use-at-least-32-characters';

/**
 * Convert string to ArrayBuffer
 */
function stringToArrayBuffer(str: string): ArrayBuffer {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
}

/**
 * Base64URL decode to ArrayBuffer
 */
function base64urlToArrayBuffer(base64url: string): ArrayBuffer {
  // Convert base64url to base64
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const base64Padded = base64 + padding;
  
  // Decode base64 to binary string
  const binaryString = atob(base64Padded);
  
  // Convert binary string to ArrayBuffer
  const buffer = new ArrayBuffer(binaryString.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binaryString.length; i++) {
    view[i] = binaryString.charCodeAt(i);
  }
  
  return buffer;
}

/**
 * Base64URL decode to string
 */
function base64urlToString(base64url: string): string {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  return atob(base64 + padding);
}

/**
 * Verify HMAC-SHA256 signature using Web Crypto API
 */
async function verifySignature(message: string, signature: string, secret: string): Promise<boolean> {
  try {
    // Convert inputs to ArrayBuffers
    const secretBuffer = stringToArrayBuffer(secret);
    const messageBuffer = stringToArrayBuffer(message);
    const signatureBuffer = base64urlToArrayBuffer(signature);

    // Import the secret key
    const key = await crypto.subtle.importKey(
      'raw',
      secretBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Verify the signature
    return await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      messageBuffer
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Verifies a JWT token using Web Crypto API (Edge Runtime compatible)
 * @param token - JWT token string
 * @returns Decoded payload if valid, null if invalid
 */
export async function verifyTokenEdge(token: string): Promise<JWTPayload | null> {
  try {
    // Split the JWT token
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid JWT format: expected 3 parts, got', parts.length);
      return null;
    }

    const [header, payload, signature] = parts;

    // Verify signature
    const message = `${header}.${payload}`;
    const isValid = await verifySignature(message, signature, JWT_SECRET);
    
    if (!isValid) {
      console.error('JWT signature verification failed');
      return null;
    }

    // Decode and parse payload
    const payloadJson = base64urlToString(payload);
    const decodedPayload = JSON.parse(payloadJson) as JWTPayload;

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (decodedPayload.exp && decodedPayload.exp < now) {
      console.error('JWT token has expired');
      return null;
    }

    return decodedPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
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