import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://nextgen:nextgen2026@cluster0.qbunbkx.mongodb.net/shahinur?appName=Cluster0',
  JWT_SECRET: process.env.JWT_SECRET || 'shahinur-akter-super-secret-jwt-key-production-2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173',
  ADMIN_SEED_EMAIL: process.env.ADMIN_SEED_EMAIL || 'admin@shahinurakter.com',
  ADMIN_SEED_PASSWORD: process.env.ADMIN_SEED_PASSWORD || 'Admin@Shahinur2026!',
  ADMIN_SEED_NAME: process.env.ADMIN_SEED_NAME || 'Shahinur Akter',
  MEDIA_STORAGE_PROVIDER: process.env.MEDIA_STORAGE_PROVIDER || 'local',
  UPLOAD_DIR: path.resolve(process.cwd(), 'uploads'),
};
