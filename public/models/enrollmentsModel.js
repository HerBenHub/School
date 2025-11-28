import pool from '../db.js';

export const getAllEnrollments = async () => {
  const [rows] = await pool.execute('SELECT * FROM enrollments');
  return rows;
}

export const getEnrollmentById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM enrollments WHERE id = ?', [id]);
  return rows[0];
}

export const createEnrollment = async (studentId, courseId) => {
  const [result] = await pool.execute(
    'INSERT INTO enrollments (student_id, course_id, enrolled_at) VALUES (?, ?, ?)', [studentId, courseId, Now()]); //Valamiért nem működik a Now() függvény, az előző feladatokban működött...
  return result.insertId;
}

export const updateEnrollment = async (id, studentId, courseId) => {
  await pool.execute(
    'UPDATE enrollments SET student_id = ?, course_id = ? WHERE id = ?',
    [studentId, courseId, id]
  );
}

export const deleteEnrollment = async (id) => {
  await pool.execute('DELETE FROM enrollments WHERE id = ?', [id]);
}