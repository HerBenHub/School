import express from 'express';
import * as enrollmentsModel from '../models/enrollmentsModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const enrollments = await enrollmentsModel.getAllEnrollments();
    res.status(201).send(enrollments);
    } catch (error) {
    res.status(501).send({error: 'Nem lehetett lekérdezni az adatokat!'});
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
      res.status(404).send({ error: 'Beiratkozás nem található!' });
    }
  } catch (error) {
    res.status(501).send({ error: 'Nem lehetett lekérdezni a beiratkozást!' });
  }
});

export default router;