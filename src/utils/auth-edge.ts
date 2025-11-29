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
 * Base64URL encode
 */
function base64urlEncode(data: ArrayBuffer): string {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(data)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Base64URL decode
 */
function base64urlDecode(data: string): ArrayBuffer {
  const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const binaryString = atob(base64 + padding);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Verify HMAC SHA256 signature using Web Crypto API
 */
async function verifySignature(data: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(data);
    const signatureData = base64urlDecode(signature);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    return await crypto.subtle.verify('HMAC', cryptoKey, signatureData, messageData);
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
      console.error('Invalid JWT format');
      return null;
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    // Verify signature
    const data = `${headerB64}.${payloadB64}`;
    const isValid = await verifySignature(data, signatureB64, JWT_SECRET);
    
    if (!isValid) {
      console.error('Invalid JWT signature');
      return null;
    }

    // Decode payload
    const payloadBuffer = base64urlDecode(payloadB64);
    const payloadStr = new TextDecoder().decode(payloadBuffer);
    const payload = JSON.parse(payloadStr) as JWTPayload;

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      console.error('JWT token expired');
      return null;
    }

    // Return the valid payload
    return payload;
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