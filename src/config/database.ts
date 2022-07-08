import pg from "pg";

import "./setup.js";

const { Pool } = pg;
export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});
