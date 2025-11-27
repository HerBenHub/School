import pool from '../db.js';

export const getAllCourses = async () => {
  const [rows] = await pool.query('SELECT * FROM courses');
  return rows;
}