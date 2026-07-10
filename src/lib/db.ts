import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const isServerless = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
let databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

if (isServerless) {
  const tmpDbPath = '/tmp/dev.db';
  try {
    // 1. Copy the starter database from the project bundle to /tmp if it doesn't exist
    if (!fs.existsSync(tmpDbPath)) {
      const srcPath = path.resolve(process.cwd(), 'prisma/dev.db');
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, tmpDbPath);
        console.log('Successfully copied SQLite dev.db to writable /tmp/dev.db');
      } else {
        console.warn('Prisma starter dev.db not found at:', srcPath);
      }
    }
    // 2. Override connection URL to point to the writable /tmp file
    databaseUrl = `file:${tmpDbPath}`;
  } catch (err) {
    console.error('Failed to initialize serverless writable SQLite database:', err);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize Prisma Client with the dynamic connection URL
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl
    }
  }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
