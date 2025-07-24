
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';


const pool = mysql.createPool(process.env.DATABASE_URL);

async function testConnection() {
  try {
    const db = drizzle(pool);
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('DB Connection Success:', rows);
  } catch (err) {
    console.error('DB Connection Failed:', err);
  } finally {
    await pool.end();
  }
}

testConnection(); 