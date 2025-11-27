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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
    if(id < 0){
        return res.status(404).send({ error: 'Az ID nem lehet negatív!' });
    }
    try {
    const student = await studentsModel.getStudentById(id);
    if (student) {
      res.status(201).send(student);
    } else {
      res.status(404).send({ error: 'Diák nem található!' });
    }
  } catch (error) {
    res.status(501).send({ error: 'Nem lehetett lekérdezni a diákot!' });
  }
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newStudentId = await studentsModel.createStudent(name, email);
    res.status(201).send({ id: newStudentId, name, email });
  } catch (error) {
    res.status(501).send({ error: 'Nem lehetett létrehozni a diákot!' });
  }
});

export default router;