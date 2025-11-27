import express from 'express';
import cors from 'cors';

import coursesRouter from './routers/coursesRouter.js';7
import studentsRouter from './routers/studentsRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);

app.listen(3000, () => {
  console.log('A szervered: http://localhost:3000');
});
