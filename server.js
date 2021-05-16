import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('Server Running on port 3001');
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
