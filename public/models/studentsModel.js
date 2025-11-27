import pool from '../db.js';

export const getAllStudents = async () => {
  const [rows] = await pool.execute('SELECT * FROM students');
  return rows;
}