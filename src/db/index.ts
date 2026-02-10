import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Lazy initialization to avoid build-time errors
let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
    if (!_db) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error('DATABASE_URL environment variable is not set');
        }
        const sql = neon(connectionString);
        _db = drizzle(sql, { schema });
    }
    return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
    get(target, prop) {
        return (getDb() as any)[prop];
    }
});
