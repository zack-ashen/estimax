import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: [
    './src/db/schema/*.schema.ts',
    './src/db/schema/joinTables/*.schema.ts',
  ],
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
});
