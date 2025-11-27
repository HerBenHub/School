import express from 'express';
import * as coursesModel from '../models/coursesModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const courses = await coursesModel.getAllCourses();
    res.status(201).send(courses);
  } catch (error) {
    res.status(501).send({error: 'Nem lehetett lekérdezni a kurzusokat!'});
  }
});

export default router;