import express from 'express';
import * as enrollmentsModel from '../models/enrollmentsModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const enrollments = await enrollmentsModel.getAllEnrollments();
    res.status(201).send(enrollments);
    } catch (error) {
    res.status(501).send({error: 'Nem lehetett lekérdezni az adatokat!', details: error.message});
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

    if(id < 0){
        return res.status(404).send({ error: 'Az ID nem lehet negatív!' });
    }

    try {
    const enrollment = await enrollmentsModel.getEnrollmentById(id);
    if (enrollment) {
      res.status(201).send(enrollment);
    } else {
      res.status(404).send({ error: 'Beiratkozás nem található!' , details: error.message});
    }
  } catch (error) {
    res.status(501).send({ error: 'Nem lehetett lekérdezni a beiratkozást!' , details: error.message});
  }
});

router.post('/', async (req, res) => {
  const { studentId, courseId, enrolled_at } = req.body;

    if (!studentId || !courseId) {
        return res.status(400).send({ error: 'Hiányzó adatok!' , details: error.message});
    }

    try {
      const newEnrollmentId = await enrollmentsModel.createEnrollment(studentId, courseId, enrolled_at);
      res.status(201).send({ id: newEnrollmentId });
    } catch (error) {
      res.status(501).send({ error: 'Nem lehetett létrehozni a beiratkozást!' , details: error.message});
    }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { studentId, courseId } = req.body;

    if(id < 0){
        return res.status(404).send({ error: 'Az ID nem lehet negatív!' , details: error.message});
    }

    if (!studentId || !courseId) {
        return res.status(400).send({ error: 'Hiányzó adatok!' , details: error.message});
    }

    try {
      await enrollmentsModel.updateEnrollment(id, studentId, courseId);
      res.status(200).send({ message: 'Beiratkozás frissítve!' });
    } catch (error) {
      res.status(501).send({ error: 'Nem lehetett frissíteni a beiratkozást!', details: error.message });
    }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

    if(id < 0){
        return res.status(404).send({ error: 'Az ID nem lehet negatív!' , details: error.message});
    }

    try {
      await enrollmentsModel.deleteEnrollment(id);
      res.status(200).send({ message: 'Beiratkozás törölve!' });
    } catch (error) {
      res.status(501).send({ error: 'Nem lehetett törölni a beiratkozást!', details: error.message });
    }
});

export default router;