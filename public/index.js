import express from 'express';
import cors from 'cors';

import coursesRouter from './routers/coursesRouter.js';
import studentsRouter from './routers/studentsRouter.js';
import enrollmentsRouter from './routers/enrollmentsRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);
app.use('/enrollments', enrollmentsRouter);

app.listen(3000, () => {
  console.log('A szervered: http://localhost:3000');
});
