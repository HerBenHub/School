import express from 'express';
import * as studentsModel from '../models/studentsModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await studentsModel.getAllStudents();
    res.status(201).send(students);
    } catch (error) {
    res.status(501).send({error: 'Nem lehetett lekérdezni a diákokat!'});
  }
});

export default router;