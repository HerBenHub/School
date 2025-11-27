import pool from '../db.js';

export const getAllCourses = async () => {
  const [rows] = await pool.execute('SELECT * FROM courses');
  return rows;
}

export const getCourseById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
  return rows[0];
}

export const createCourse = async (title, description) => {
  const [result] = await pool.execute(
    'INSERT INTO courses (title, description) VALUES (?, ?)',
    [title, description]
  );
  return result.insertId;
}

export const updateCourse = async (id, title, description) => {
  await pool.execute(
    'UPDATE courses SET title = ?, description = ? WHERE id = ?',
    [title, description, id]
  );
}

export const deleteCourse = async (id) => {
  await pool.execute('DELETE FROM courses WHERE id = ?', [id]);
}