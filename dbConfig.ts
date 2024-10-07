import { Pool } from "pg";

// const pool = new Pool({
//   user: process.env.DB_USER || "postgres",
//   password: process.env.DB_PASSWORD || "Szymon12345",
//   host: process.env.DB_HOST || "localhost",
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
//   database: process.env.DB_DATABASE || "pern",
// });

const localPoolConfig = {
  user: "postgres",
  password: "Szymon12345",
  host: "localhost",
  port: 5432,
  database: "pern",
};

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : localPoolConfig;

// Could have a connection string instead

// const isProduction = process.env.NODE_ENV === "production"
// const connectionString = "..."

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString
// });

const pool = new Pool(poolConfig);

export default pool;
