import express from 'express';
import * as coursesModel from '../models/coursesModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const courses = await coursesModel.getAllCourses();
    res.status(201).send(courses);
  } catch (error) {
    res.status(501).send({error: 'Nem lehetett lekérdezni a kurzusokat!' , details: error.message});
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

    if(id < 0){
        return res.status(404).send({ error: 'Az ID nem lehet negatív!' , details: error.message});
    }

  try {
    const course = await coursesModel.getCourseById(id);
    if (course) {
      res.status(201).send(course);
    } else {
      res.status(404).send({ error: 'Kurzus nem található!' , details: error.message});
    }
  } catch (error) {
    res.status(501).send({ error: 'Nem lehetett lekérdezni a kurzust!' , details: error.message});
  }
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send({ error: 'Hiányzó adatok!' , details: error.message});
    }
  try {
    const newCourseId = await coursesModel.createCourse(title, description);
    res.status(201).send({ id: newCourseId, title, description });
  } catch (error) {
    res.status(501).send({ error: 'Nem lehetett létrehozni a kurzust!' , details: error.message});
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
    if(id < 0){
        return res.status(404).send({ error: 'Az ID nem lehet negatív!' });
    }
    if (!title || !description) {
        return res.status(400).send({ error: 'Hiányzó adatok!' , details: error.message});
    }
  try {
    await coursesModel.updateCourse(id, title, description);
    res.status(200).send({ id, title, description });
  } catch (error) {
    res.status(501).send({ error: 'Nem lehetett frissíteni a kurzust!' , details: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
    if(id < 0){
        return res.status(404).send({ error: 'Az ID nem lehet negatív!' , details: error.message});
    }
  try {
    await coursesModel.deleteCourse(id);
    res.status(200).send({ message: 'Kurzus törölve!' });
  } catch (error) {
    res.status(501).send({ error: 'Nem lehetett törölni a kurzust!' , details: error.message});
  }
});

export default router;