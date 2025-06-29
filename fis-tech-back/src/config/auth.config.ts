require('dotenv').config();

export const JWT_SECRET = process.env.JWT_SECRET || '123';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '15m';

export const REFRESH_SECRET = process.env.REFRESH_SECRET || '123';
export const REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION || '7d';
