import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'heritage_site_crowd_super_secret_jwt_key_2026_secured';
const JWT_EXPIRES_IN = '7d';
/**
 * Hash password using bcrypt with salt rounds 10
 */
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
/**
 * Compare plain password against bcrypt hash
 * Also supports backward compatibility if database contains legacy demo plain passwords
 */
export async function comparePassword(password, hash) {
    if (!password || !hash)
        return false;
    try {
        const isMatch = await bcrypt.compare(password, hash);
        if (isMatch)
            return true;
    }
    catch (err) {
        // If hash was not a valid bcrypt string, check direct comparison as fallback
    }
    return password === hash;
}
/**
 * Sign JWT Token with payload
 */
export function signJwtToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
/**
 * Verify JWT Token
 */
export function verifyJwtToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (err) {
        return null;
    }
}
/**
 * Decode JWT token payload (works across Edge & Node runtimes)
 */
export function decodeJwtPayload(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3)
            return null;
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
        return JSON.parse(jsonPayload);
    }
    catch (e) {
        return null;
    }
}
/**
 * Set HTTP-Only Secure Authentication Cookie
 */
export function setAuthCookie(response, token) {
    response.cookies.set('heritage_auth_token', token, {
        httpOnly: false, // Accessible to client-side JS for auth state detection
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        path: '/',
    });
    return response;
}
/**
 * Clear Authentication Cookie on logout
 */
export function clearAuthCookie(response) {
    response.cookies.set('heritage_auth_token', '', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
    });
    return response;
}
