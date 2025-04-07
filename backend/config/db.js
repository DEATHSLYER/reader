import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',
  database: 'readerdb',
  password: 'mindkiller',  // Correct password
  port: 5432,
});

export default pool;
