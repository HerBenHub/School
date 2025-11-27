import pool from '../db.js';

export const getAllEnrollments = async () => {
  const [rows] = await pool.execute('SELECT * FROM enrollments');
  return rows;
}

export const getEnrollmentById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM enrollments WHERE id = ?', [id]);
  return rows[0];
}