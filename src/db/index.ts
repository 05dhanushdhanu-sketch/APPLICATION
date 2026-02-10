import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Use a placeholder during build, real value at runtime
const connectionString = process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@localhost:5432/placeholder';

if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ DATABASE_URL is missing in production environment!');
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
