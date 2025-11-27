import pool from '../db.js';

export const getAllStudents = async () => {
  const [rows] = await pool.execute('SELECT * FROM students');
  return rows;
}

export const getStudentById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
  return rows[0];
}

export const createStudent = async (name, email) => {
  const [result] = await pool.execute(
    'INSERT INTO students (name, email) VALUES (?, ?)',
    [name, email]
  );
  return result.insertId;
}